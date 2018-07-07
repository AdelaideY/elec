require.config({
    paths: {
        'jquery': './jquery',
        'http': './httpclient'
    }
})

require(['jquery', 'http'], function ($, http) {
    $(function () {
        var aa = randomMa()
        $('.verifyimg').val(aa);
        // $('#btnRegister').click(function(){
        //     //ajax
        //     http.post('User/Login', {
        //         username: $('#username').val().trim(),
        //         password: $('#password').val().trim()
        //     }).then(function(res){
        //         console.log(res);
        //     })
        // })
        $('#new_account').on('blur', function () {
            if (!(/^1[34578]\d{9}$/.test($('#new_account').val()))) {
                $('.error_tips span').text('邮箱或手机号格式不正确');
                $('.error_tips').show();
                return false;
            }else{
                $('.error_tips').hide();
                $('#reg_password').on('blur', function () {
                    if (!(/^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/.test($('#reg_password').val()))) {
                        $('.error_tips span').text('6-16位字符，必须包含英文字母和数字');
                        $('.error_tips').show();
                        return false;
                    }else{
                        $('.error_tips').hide();
                        $('#reg_verifyCode').on('blur', function () {
                            if ($('#reg_verifyCode').val() != $('.verifyimg').val()) {
                                $('.error_tips span').text('验证码不正确');
                                $('.error_tips').show();
                                return false;
                            }
                        })
                    }
                })
            }
        })
        $('#btnRegiste').click(function () {
            // if(!(/^1[34578]\d{9}$/.test($('#new_account').val())) && !(/^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/.test($('#reg_password').val())) && $('#reg_verifyCode').val() != $('.verifyimg').val()){
            //     $('.error_tips span').text('信息填写错误');
            //     $('.error_tips').show();
            // }
            if ($('#new_account').val() !== '' && $('.verifyimg').val() !== '') {
                $.post('./api/register.php', {
                    name: $('#new_account').val(),
                    pwd: $('#reg_password').val()
                }).then(function (res) {
                    if (res == "{state: false, message: '账号 已被注册！！！'}") {

                        var data = window.eval('(' + res + ')');
                      
                        $('.error_tips span').text(data.message);
                        $('.error_tips').show();
                    } else if (res == "{state: true,message:}") {
                        window.location.href = '../src/index.html'
                    }

                })
            }else{
                $('.error_tips span').text('请填写信息');
                $('.error_tips').show();
            }

        })

        function randomMa() {
            var arr = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5,6,7,8,9,0'.split(',');
            var str = ''
            for (var i = 0; i < 4; i++) {
                var num = arr[parseInt(Math.random() * 36)];
                str += num;
            }
            return str;

        }
        randomMa()
    })
})