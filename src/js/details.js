require.config({
    paths: {
        'jquery': './jquery',
        'http': './httpclient',
        'magnifying': './magnifying'
    }
})

define(['jquery', 'http', 'magnifying'], function ($, http, magnifying) {
    $(function () {
        $('header').load('./header.html', function () {
            function ranload(){
                var mes = window.localStorage.getItem('dl');
                if(mes !==null){
                    mes = mes.split(';');
                    var txinxi= '<p>Hi<a href="javascript:">'+ mes[0].split(':')[1] +'</a>欢迎来到速普城[<a href="../src/index.html" class="layout">退出</a>]</p>';
                   $(txinxi).appendTo($('.y-top-left'));
                }else{
                    var mess = '<p>欢迎来到速普商城！请['+
                        '<a href="./login.html">登录</a>]['+
                        '<a href="./register.html">免费注册</a>'+
                        ']</p>'
                        $(mess).appendTo($('.y-top-left'));
                }
            }
            ranload();

            $('.layout').click(function(){
                window.localStorage.clear();
                ranload();
            })
            $.post('./api/products.php').then(function (res) {
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
            $.get('./api/products.php').then(function (res) {
                var data = window.eval('(' + res + ')').data1;
                var id = window.location.search.slice(1);

                $('.dtitle').text('首页>' + data[id - 1].name);
                // console.log(data[id-1]);
                var imgurl = data[id - 1].imgurl.split(',');
                $('.dimg')[0].src = imgurl[0];
              
                for (var i = 0; i < imgurl.length-1; i++) {
                    var li = $('<li>');
                    ($('<img/>').attr('src', imgurl[i + 1]).css({
                        'display': 'inline-block',
                        'width': '60px',
                        'height': '60px'
                    })).appendTo(li);
                    li.appendTo($('.dcontain .dmain .dmain_l .dmain_l_c .ditem ul'));
                }
                $('.dcontain .dmain .dmain_l .dmain_l_c .ditem ul li').on('mouseenter', function (e) {


                    if ($(e.target).is('img')) {
                        console.log($(e.target))
                        $(e.target).css({
                            'border': '1px solid red'
                        })
                        $('.dimg').attr('src', $(e.target).attr('src'))
                    }

                })
                $('.dcontain .dmain .dmain_l .dmain_l_c .ditem ul li').on('mouseout', function (e) {
                    if ($(e.target).is('img')) {
                        $(e.target).css({
                            'border': 'none'
                        })
                    }
                })
                $('.sj').text('￥' + data[id - 1].chuxiao);
                var spread = data[id - 1].marketp - data[id - 1].chuxiao;
                $('.mj').text('￥' + data[id - 1].marketp);
                $('.bz').text('（为您节省了：' + spread + '）元');
                $('.good_d_downbtn').click(function () {
                    if ($('#good_d_sum').val() > 0) {
                        $('#good_d_sum').val($('#good_d_sum').val() * 1 - 1);
                    }

                })
                $('.good_d_upbtn').click(function () {
                    $('#good_d_sum').val($('#good_d_sum').val() * 1 + 1);
                })
                $('.addcar').click(function () {
                    data[id - 1].num = data[id - 1].num * 1 + $('#good_d_sum').val()*1;
                    $.post('../src/api/details.php',{id:data[id-1].id,num:data[id-1].num}).then(function(res){
                        
                        window.localStorage.setItem('car', JSON.stringify(data[id - 1]));
                    })
                   
                })



                magnifying.initialize($('.dmain_l_t'))
                // 鼠标进入
                $('.dmain_l_t').mouseenter(function (e) {
                    e = e.target
                    if (!e.src) {
                        // 鼠标在父对象边框进入的情况
                        // src将获取不到
                        e = $('img', e)[0]
                    }
                    magnifying.into(e.src)
                });
                // 鼠标离开
                $('.dmain_l_t').mouseleave(function (e) {
                    magnifying.leave()
                });
                // 鼠标移动
                $('.dmain_l_t').mousemove(function (e) {
                    magnifying.mover(e)
                });
            })
        })
    })
})