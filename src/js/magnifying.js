define(['jquery'],function($){
    var hz,box,kz,yt_div
    return {
        // 初始化放大镜
        initialize:function(div){
            // div.css('position', 'relative')
            var zb=div.offset()
                yt_div=div
                kz=div
                box=$('<div>')
            var bs=2
                ck=200
                box.css({
                    'width':ck*bs+'px',
                    'height':ck*bs+'px',
                    'position': 'absolute',
                    'border': 'solid 1px #dfdfdf',
                    'z-index': '999',
                    'overflow': 'hidden',
                    'top':zb.top,
                    'left':zb.left+div.width()+10,
                    'display':'none'
                })
            var img=$('<img>')
                img.css({
                    'width':div.width()*bs,
                    'height':div.height()*bs,
                    'position': 'absolute'
                })
                box.append(img)
            var k=$('<div>')
                k.css({
                    'width':div.width()/bs+'px',
                    'height':div.height()/bs+'px',
                    'background': 'rgba(255,255,255,0.5)',
                    'position': 'absolute',
                    'top':'0',
                    'left':'0',
                    'display':'none'
                })
                hz=k
            // 必须添加到内部才不会触发离开div事件
            // 用计时器防止被其他操作清理掉
            setTimeout(()=>{div.append(k)},500)
            $('body').append(box)
        },
        // 鼠标移动时的触发方法
        mover:function(e){
            var yt_xy=yt_div.offset()
            var x=e.pageX-hz.width()/2
            var y=e.pageY-hz.height()/2
            if(x-yt_xy.left<0){
                x=yt_xy.left
            }
            if(x+hz.width()>yt_xy.left+kz.width()){
                x=yt_xy.left+kz.width()-hz.width()
            }
            if(y-yt_xy.top<0){
                y=yt_xy.top
            }
            if(y+hz.height()>yt_xy.top+kz.height()){
                y=yt_xy.top+kz.height()-hz.width()
            }
                hz.css({
                    'left':x+'px',
                    'top':y+'px'
                })
                yt_xy
                $('img',box).css({
                    'left':(yt_xy.left-x)*2+'px',
                    'top':(yt_xy.top-y)*2+'px'   
                })

            
        },
        // 鼠标移入事件.自动获取内部的img
        into:function(url){
            // console.log($('img',box))
            box.css('display','block')
            hz.css('display','block')
            $('img',box).attr('src',url)
            if(!$('img',box).attr('src')){
                console.log('空',url)
                     
            }
        },
        // 鼠标移出事件
        leave:function(){
            box.css('display','none')
            hz.css('display','none')
        }
    }
})