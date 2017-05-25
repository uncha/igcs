define(function () {
    var FileUploadPopup = Vue.component('FileUploadPopup', function(resolve, reject){
        var data = {
            title:'IMG_2056.jpg'
        }
        
        $.ajax({
            url:'/template/popup/file_upload_popup.html',
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
        FileUploadPopup:FileUploadPopup
    }
});