define(function () {
    var ImageUploadPopup = Vue.component('ImageUploadPopup', function(resolve, reject){
        var data = {
            title:'',
            src:'',
            fileName:''
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
                    },
                    methods:{
                        onDroppable:function(e){
                            var file = e.dataTransfer.files[0];
                            var url = window.URL.createObjectURL(file);

                            // 파일 유형 검사
                            if(!file.type.match('image')){
                                alert('이미지 파일만 업로드 가능합니다.');
                                return false;
                            }

                            // 파일 크기 검사
                            var limitByteSize = 10 * 1048576;
                            if(file.size > limitByteSize){
                                alert('10MB가 넘는 파일이 포함되어 있습니다.');
                                return false;
                            }

                            // 이미지 메모리 해제
                            if(this.src) window.URL.revokeObjectURL(this.src);

                            this.src = url;
                            this.fileName = file.name;
                        }
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