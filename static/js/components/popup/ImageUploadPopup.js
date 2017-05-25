define(function () {
    var ImageUploadPopup = Vue.component('ImageUploadPopup', function(resolve, reject){
        var data = {
            title:'IMG_2056.jpg'
        }
        
        $.ajax({
            url:'/template/popup/image_upload_popup.html',
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
        ImageUploadPopup:ImageUploadPopup
    }
});