require.config({
    paths: {
        'jquery': './jquery',
        'http': './httpclient'
    }
})
require(['jquery', 'http'], function ($, http) {
    if ($('head title').text() == 'Index') {
        $(function () {
            $('header').load('./header.html', function () {
                $.post('./api/products.php').then(function (res) {
                    var datas = window.eval('(' + res + ')').data1;
                    var ssss = 0;
                    datas.forEach(function (item) {
                        ssss += item.num * 1;
                    })
                   $('.shuliang').text(ssss)
                })
                $('.shuliang').text();
            });
            $('footer').load('./footer.html');
            $.get('./api/products.php').then(function (res) {
                var data = window.eval('(' + res + ')');


                $('#contain').load('./contain.html', function () {
                    $('.qgc ul li').click(function (e) {
                        var id = $(this).attr('data-id');
                        window.location.href = "../src/details.html?" + id;
                    })
                });

                // $('.lazy')[0].style.src = data.data1[4].imgurl1;

            })
            var j = 1;
            var k = 0;
            var timer;

            function lunbo() {
                function auto() {
                    timer = setInterval(function () {
                        if (j >= 2) {
                            j = 0;
                        }
                        if (k > 1) {
                            k = 0;
                        }
                        $('#banner ul').css({
                            'transform': 'translateX(' + $('#banner').width() * -j + 'px)',
                            'transition': 'transform 0.5s'
                        })
                        $('#banner div i')[k].style.backgroundColor = '#666';
                        $('#banner div i')[(k + 1) % 2].style.backgroundColor = 'red';
                        k++;
                        j++;
                    }, 3000)
                }
                auto();
                $('#banner').click(function (e) {
                    if ($(e.target).is('.pre')) {
                        if (j < 1) {
                            j = 2;
                        }
                        if (k > 1) {
                            k = 0;
                        }
                        console.log(j)
                        clearInterval(timer);
                        $('#banner ul').css({
                            'transform': 'translateX(' + $('#banner').width() * -(j % 2) + 'px)',
                            'transition': 'transform 0.5s'
                        })
                        $('#banner div i')[k].style.backgroundColor = '#666';
                        $('#banner div i')[(k + 1) % 2].style.backgroundColor = 'red';
                        k++;
                        j--;
                        auto()
                    } else if ($(e.target).is('.next')) {
                        if (j > 2) {
                            j = 1;
                        }
                        if (k > 1) {
                            k = 0;
                        }
                        console.log(j)
                        clearInterval(timer);
                        $('#banner ul').css({
                            'transform': 'translateX(' + $('#banner').width() * -(j % 2) + 'px)',
                            'transition': 'transform 0.5s'
                        })
                        $('#banner div i')[k].style.backgroundColor = '#666';
                        $('#banner div i')[(k + 1) % 2].style.backgroundColor = 'red';
                        k++;
                        j++;
                        auto();
                    }
                })
            }
            lunbo();

        })
    }

})