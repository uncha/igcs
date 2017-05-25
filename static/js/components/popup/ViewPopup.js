define(function () {
    var ViewPopup = Vue.component('ViewPopup', function(resolve, reject){
        var data = {
            title:'IMG_2056.jpg',
            contentType:'image' // image, video, audio
        }
        
        $.ajax({
            url:'/template/popup/view_popup.html',
            type:'get',
            dataType:'html',
            success:function(template){
                resolve({
                    template:template,
                    data:function(){
                        return data;
                    }
                });
            },
            error:function(xhr){
                console.log(xhr);
            }
        });
    });
    
    return {
        ViewPopup:ViewPopup
    }
});