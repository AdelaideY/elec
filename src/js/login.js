require.config({
    paths: {
        'jquery': './jquery',
        'http': './httpclient'
    }
})
define(['jquery','http'],function($,http){
    $(function(){
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
      
        $('#btnLogin').click(function(){
            if ($('#new_account').val() !== '' && $('.verifyimg').val() !== '') {
                $.post('./api/login.php', {
                    name: $('#new_account').val(),
                    pwd: $('#reg_password').val()
                }).then(function (res) {
                    if (res == "{state: false, message: '登录失败！！！'}") {
                        var data = window.eval('(' + res + ')');
                        $('.error_tips span').text(data.message);
                        $('.error_tips').show();
                    } else if (res == "{state: true, message: '登录成功！！！'}") {
                        console.log(666);
                        window.localStorage.setItem('dl','name:'+$('#new_account').val()+';pwd:'+$('#reg_password').val());
                        window.location.href = '../src/index.html';
                    }

                })
            }else{
                $('.error_tips span').text('请填写信息');
                $('.error_tips').show();
            }
        })
        
    })
})