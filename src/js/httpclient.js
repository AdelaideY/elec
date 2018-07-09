require.config({
    paths: {
        'jquery': './jquery'
    }
})

define(['jquery'], function($){
    var baseUrl = "http://10.3.136.12:1808/src/";
    function filterUrl(_url){
        if(_url.startsWith('http')){
            return _url;
        }  
        return baseUrl + _url;
    }

    return {
        get: function(_url, _data){
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: filterUrl(_url),
                    data: _data || {},
                    headers: {
                        Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
                    },
                    beforeSend: function(){
                        loading.show();
                    },
                    success: function(res){
                        loading.hide();
                        resolve(res)
                    },
                    error: function(error){
                        loading.hide();
                        if(error.responseJSON.code == 40001){
                            window.location.href = 'login.html';
                        } else {
                            alert(error.responseJSON.message);
                        }
                        reject(error);
                    }
                })
            })
        },
        post: function(_url, _data){
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: filterUrl(_url),
                    data: _data || {},
                    type: 'post',
                    headers: {
                        Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
                    },
                    beforeSend: function(){
                        loading.show();
                    },
                    success: function(res){
                        if(_url.toLowerCase().indexOf('login') > -1){
                            window.localStorage.setItem('access_token', res.data.result.access_token);
                        }
                        resolve(res);
                        loading.hide();
                    },
                    error: function(error){
                        reject(error);
                        if(error.responseJSON.code == 40001){
                            window.location.href = 'login.html';
                        } else {
                            alert(error.responseJSON.message);
                        }
                        loading.hide();
                    }
                })
            })
        },
    }
})