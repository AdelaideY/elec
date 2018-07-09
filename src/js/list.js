require.config({
    paths: {
        'jquery': './jquery',
        'http': './httpclient',
    }
})
require(['jquery', 'http'], function ($, http) {
    $(function () {
        $('header').load('./header.html', function () {
            $.post('./api/products.php').then(function (res) {
                function ranload() {
                    var mes = window.localStorage.getItem('dl');
                    if (mes !== null) {
                        mes = mes.split(';');
                        var txinxi = '<p>Hi<a href="javascript:">' + mes[0].split(':')[1] + '</a>欢迎来到速普城[<a href="../src/index.html" class="layout">退出</a>]</p>';
                        $(txinxi).appendTo($('.y-top-left'));
                    } else {
                        var mess = '<p>欢迎来到速普商城！请[' +
                            '<a href="./login.html">登录</a>][' +
                            '<a href="./register.html">免费注册</a>' +
                            ']</p>'
                        $(mess).appendTo($('.y-top-left'));
                    }
                }
                ranload();

                $('.layout').click(function () {
                    window.localStorage.clear();
                    ranload();
                })
                var datas = window.eval('(' + res + ')').data1;
                var ssss = 0;
                datas.forEach(function (item) {
                    ssss += item.num * 1;
                })
                $('.shuliang').text(ssss)
            })
            $('.shuliang').text();
            $('#y-header .headnav .container > ul > li:first-child > ul')[0].style.display = 'none';
            $('#y-header .headnav .container > ul > li:first-child').on('mouseover', function () {
                $('#y-header .headnav .container > ul > li:first-child > ul')[0].style.display = 'block';
            })
            $('#y-header .headnav .container > ul > li:first-child').on('mouseleave', function () {
                $('#y-header .headnav .container > ul > li:first-child > ul')[0].style.display = 'none';
            })
        })
        for (var g = 0; g < 2; g++) {
            var span = $('<span>').text(g + 1).css({
                'display': 'inline-block',
                'width': '20px',
                'height': '20px',
                'float': 'right'
            });

            span.appendTo('footer .container');
        }
        shuaxin(1);
        $('footer .container span').click(function(){
            var page = $(this).text();
            $('main .container').text('');
            shuaxin(page);
        })
        function shuaxin(page) {
            $.post('../src/api/products.php', {
                limit: 10,page:page
            }).then(function (res) {
                var data = window.eval('(' + res + ')').data1;
    
                var beiqin = [];
    
                data.forEach(function (item) {
                    if (item.type === 'beiqin') {
                        beiqin.push(item);
                    }
                })
                var ul = $('<ul>');
                beiqin.forEach(function (item, idx) {
                    if (idx < 10) {
                        var li = '<li data-id = "' + item.id + '"><div class="clearfix"><div class="list_good_img"><a href="javascript:"><img src="' + item.imgurl.split(',')[0] + '" alt=""></a></div><div class="list_good_des"><a href="javascript:"><span>' + item.rename + '</span><b>' + item.name + '</b></a></div><div class="list_good_price"><span class="lsj">￥' + item.chuxiao + '</span><span class="lmj">￥' + item.marketp + '</span><div class="ac_info" style="border-color: rgb(255, 255, 255);"><span>更多促销<i class="fa fa-caret-down"></i></span><div class="info_box" style="display: none;"><div title="润本满99立减40"><span>满额立减</span>润本满99立减40</div><div title="加8元换购驱蚊贴20+2片"><span>超值换购</span>加8元换购驱蚊贴20+2片</div></div></div></div><div class="list_good_addbox"><div class="list_good_sumbox fl"><a href="javascript:void(0)" class="list_good_upnum fr">+</a><input type="text" name="" value="1" mincout="1" minstart="1" class="list_good_num ellipsis fl"><a href="javascript:void(0)" class="list_good_downnum fr">-</a></div><input type="hidden" class="cartid" value="0104460002"><input type="hidden" class="goodsid" value="18590"><input type="hidden" class="groupid" value=""><input type="hidden" class="keybuy" value=""><a href="javascript:void(0)" class="btn list_good_addcart fl addcar" style="background: rgb(246, 246, 246); color: rgb(51, 51, 51);"><span class="fl">加入购物车</span></a><a href="javascript:void(0)" class="list_good_addfav fl myfav_18590" onclick="add_fav(18590)">收藏</a></div></div></li>';
                        $(li).appendTo(ul);
                        var span = $('<span>').text('')
                    }
    
                })
                ul.appendTo($('main .container'));
                $('.list_good_upnum').click(function () {
                    $('.list_good_num').val($('.list_good_num').val() * 1 + 1);
                })
                $('.list_good_downnum').click(function () {
                    if ($('.list_good_num').val() > 0) {
                        $('.list_good_num').val($('.list_good_num').val() * 1 - 1);
                    }
                })
    
    
                $('.list_good_addcart').click(function () {
                    console.log(data);
                    data.forEach(function (item) {
                        if (item.name == $(this).parent().siblings('.list_good_des').find('b').text()) {
                            item.num = item.num * 1 + $('.list_good_num').val() * 1;
                            $.post('../src/api/details.php', {
                                id: item.id,
                                num: item.num
                            }).then(function (res) {
                                window.localStorage.setItem('car', JSON.stringify(item));
                            })
    
                        }
                    }.bind(this))
                })
                $('main ul li').on('mouseover', function () {
                    $(this).css({
                        'border': '3px solid #e5004b'
                    })
                    $(this).find('.list_good_addcart').css({
                        'backgroundColor': '#e5004b',
                        'color': '#fff'
                    })
                })
                $('main ul li').on('mouseleave', function () {
                    $(this).css({
                        'border': '3px solid #FFF'
                    })
                    $(this).find('.list_good_addcart').css({
                        'backgroundColor': '#FFF',
                        'color': '#000'
                    })
                })
                $('.ac_info span').on('mouseover', function () {
                    $(this).siblings('.info_box').css({
                        'display': 'block'
                    });
                })
                $('.ac_info span').on('mouseleave', function () {
                    $(this).siblings('.info_box').css({
                        'display': 'none'
                    });
                })
                $('main ul li').click(function (e) {
                    if ($(e.target).parent().is('a') && !$(e.target).is('.list_good_addcart')) {
                        var lid = $(e.target).parent().parent().parent().parent().attr('data-id');
                        window.location.href = "../src/details.html?" + lid;
                    }
                })
            })
        }
        

    })
})