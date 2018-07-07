require.config({
    paths: {
        'jquery': './jquery',
        'http': './httpclient'
    }
})
define(['jquery', 'http'], function ($, http) {
    $(function () {
        $.post('../src/api/products.php').then(function (res) {
            var data = window.eval('(' + res + ')').data1;
            var cars = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].num > 0) {
                    cars.push(data[i]);
                }
            }
            var len = 0;
            var rr = 0;
            var danjia = 0;
            for (var m = 0; m < cars.length; m++) {
                var total = (cars[m].num * cars[m].chuxiao).toFixed(2);
                if (cars[m].checked == 1) {
                    rr += total * 1;
                    danjia += cars[m].num * 1;

                }


                var li = '<li data-id = "' + cars[m].id + '">' +
                    '<div class="ccon_mes fl">' +
                    '<input type="checkbox" name="" id="everysel">' +
                    '<img src="' + cars[m].imgurl.split(',')[0] + '" alt="">' +
                    '+<span>' +
                    '<a href="javacript:">' + cars[m].name + '</a>' +
                    '</span>' +
                    '</div>' +
                    '<div class="ccon_pr fl">' + cars[m].chuxiao +
                    '</div>' +
                    '<div class="ccon_num fl">' +
                    '<a href="javascript:" class="cpre">-</a><input type="text" value="' + cars[m].num + '"><a href="javascript:" class="cnext">+</a>' +
                    '</div>' +
                    '<div class="ccon_total fl">' + total +
                    '</div>' +
                    '<div class="ccon_opera fr">删除</div>' +
                    '</li>';
                //    console.log(cars[m].checked);
                $(li).appendTo($('ul'));
                if (cars[m].checked == 1) {
                    $($('li')[m]).find('#everysel').prop('checked', true)
                    $($('li')[m]).css({
                        'background': 'pink'
                    })
                }
            }
            $('#DIVGoodsCount').text(danjia);
            $('#DIVTotalSumAmount').text(rr);
            var qty = 0;
            var all = 0;
            $('.ccon ul li').click(function (e) {
                if ($(e.target).is('#everysel')) {
                    qty += $(this).find('.ccon_num').find('input').val() * 1;
                    all += $(e.target).parent().siblings('.ccon_total').text() * 1;
                    $('#DIVGoodsCount').text(qty);
                    $('#DIVTotalSumAmount').text(parseInt(all));
                    var aa = 0;
                    console.log($('li').length);
                    for (var g = 0; g < $('li').length; g++) {
                        if ($($('li')[g]).find('.ccon_mes').find('input').prop('checked')) {
                            aa++;
                        }
                    }
                    if (aa < $('li').length) {
                        $('#allsel').prop('checked', false);
                    } else {
                        $('#allsel').prop('checked', true);
                    }
                    for (var v = 0; v < data.length; v++) {
                        if (data[v].id == $(this).attr('data-id')) {
                            if (data[v].checked == 0) {
                                un = 1
                            } else {
                                un = 0;
                            }
                            $.post('../src/api/car.php', {
                                id: data[v].id,
                                checked: un
                            }).then(function (res) {
                                if ($(e.target).prop('checked')) {
                                    console.log(666)
                                    $(this).css({
                                        'background': 'pink'
                                    })
                                } else {
                                    $(this).css({
                                        'background': '#fff'
                                    })
                                }

                            }.bind(this))
                        }
                    }
                }
            })
            $('#allsel').click(function () {
                if ($(this).prop('checked')) {
                    qty = 0;
                    all = 0;
                    for (var r = 0; r < $('li').length; r++) {
                        $('li')[r].children[0].children[0].checked = 'checked';
                        $('li')[r].style.background = 'pink';
                        if ($($('li')[r].children[0].children[0]).prop('checked')) {
                            qty += $($('li')[r]).find('.ccon_num').find('input').val() * 1;
                            all += $($('li')[r]).find('.ccon_total').text() * 1;
                        }
                    }
                    $('#DIVGoodsCount').text(qty);
                    $('#DIVTotalSumAmount').text(parseInt(all));
                    data.forEach(function (item) {
                        $.post('../src/api/car.php', {
                            id: item.id,
                            checked: 1
                        }).then(function (res) {})
                    })

                } else {
                    for (var r = 0; r < $('li').length; r++) {
                        $('li')[r].children[0].children[0].checked = '';
                        $('li')[r].style.background = '';
                    }
                    data.forEach(function (item) {
                        $.post('../src/api/car.php', {
                            id: item.id,
                            checked: 0
                        }).then(function (res) {})
                    })
                }

            })

            $('.cpre').click(function () {
                console.log($(this).siblings('input').val())
                if($(this).siblings('input').val()>0){
                    data.forEach(function (item) {
                        if (item.id == $(this).parent().parent().attr('data-id')) {
                            item.num = 1 * item.num - 1;
                            $.post('../src/api/details.php', {
                                id: item.id,
                                num: item.num
                            }).then(function (res) {
                                $(this).siblings('input').val($(this).siblings('input').val() * 1 - 1);
                                $(this).parent().siblings('.ccon_total').text((($(this).siblings('input').val() * 1) * $(this).parent().siblings('.ccon_pr').text()).toFixed(2))
                            }.bind(this))
                            $.post('./api/products.php').then(function (res) {
                                var datas = window.eval('(' + res + ')').data1;
                                var ssss = 0;
                                var wwww = 0;
                                datas.forEach(function (item) {
                                    ssss += item.num * 1;
                                    wwww+= item.chuxiao*item.num;
                                })
                               $('#DIVGoodsCount').text(ssss);
                               $('#DIVTotalSumAmount').text(wwww.toFixed(2));
                            })
                        }
                    }.bind(this))
                }
               
            })
            $('.cnext').click(function () {
                data.forEach(function (item) {
                    if (item.id == $(this).parent().parent().attr('data-id')) {
                        item.num = 1 * item.num + 1;
                        console.log(item.num);
                        $.post('../src/api/details.php', {
                            id: item.id,
                            num: item.num * 1
                        }).then(function (res) {
                            $(this).siblings('input').val($(this).siblings('input').val() * 1 + 1);
                            $(this).parent().siblings('.ccon_total').text((($(this).siblings('input').val() * 1) * $(this).parent().siblings('.ccon_pr').text()).toFixed(2))
                        }.bind(this))
                        $.post('./api/products.php').then(function (res) {
                            var datas = window.eval('(' + res + ')').data1;
                            var ssss = 0;
                            var wwww = 0;
                            datas.forEach(function (item) {
                                ssss += item.num * 1;
                                wwww+= item.chuxiao*item.num;
                            })
                           $('#DIVGoodsCount').text(ssss);
                           $('#DIVTotalSumAmount').text(wwww.toFixed(2));
                        })
                    }
                }.bind(this))

            })
            $('.ccon_opera').click(function () {
                $(this).parent().remove();
                qty = 0;
                all = 0;
                for (var r = 0; r < $('li').length; r++) {
                    if ($($('li')[r].children[0].children[0]).prop('checked')) {
                        qty += $($('li')[r]).find('.ccon_num').find('input').val() * 1;
                        all += $($('li')[r]).find('.ccon_total').text() * 1;
                    }
                }
                $('#DIVGoodsCount').text(qty);
                $('#DIVTotalSumAmount').text(parseInt(all));
            })
            $('.qk').click(function () {
                data.forEach(function (item) {
                    $.post('../src/api/details.php', {
                        id: item.id,
                        num: 0
                    }).then(function (res) {})
                })
                len = 0;
                $('li').remove();
                $('#DIVGoodsCount').text(0);
                $('#DIVTotalSumAmount').text(0);
            })
            $('.sc').click(function () {
                for (var h = 0; h < 7; h++) {
                    if ($($('li')[0]).find('.ccon_mes').find('#everysel').prop('checked')) {
                        $($('li')[0]).remove();
                        len--;
                    }
                }
                $('#DIVGoodsCount').text(0);
                $('#DIVTotalSumAmount').text(0);
            })
        })
    })
})