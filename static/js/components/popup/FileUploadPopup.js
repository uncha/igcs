define(function () {
    var FileUploadPopup = Vue.component('FileUploadPopup', function(resolve, reject){
        var data = {
            title:'IMG_2056.jpg',
            allowedType:['image', 'audio', 'video'],
            uploadList:[
                /*{
                    thumbnail:'',
                    type:'image',
                    fileName:'test.jpg',
                    progress:30,
                    loadedComplete:false
                }*/
            ]
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
                    },
                    filters:{
                        progressStatus:function(value){
                            if(value == 100) value = '완료';
                            return value;
                        }
                    },
                    methods:{
                        onDeleteClick:function(i){
                            // url 메모리 해제
                            var list = this.uploadList[i];
                            if(list.type == 'image'){
                                window.URL.revokeObjectURL(list.image);
                            }

                            this.uploadList.splice(i, 1);
                        },
                        onDroppable:function(e){
                            var files = e.dataTransfer.files;
                            var len = this.uploadList.length;

                            // 한번에 올릴 수 있는 갯수 검사
                            if(files.length + len >= 20){
                                alert('한번에 20개 이상 파일을 업로드 할 수 없습니다.');
                                return false;
                            }

                            for(var i=0; i<files.length; i++){
                                var isAllowed = false;
                                var file = files[i];
                                var type = file.type.split('/')[0];
                                var url = window.URL.createObjectURL(file);

                                // 파일 유형 검사
                                for(var j=0; j<this.allowedType.length; j++){
                                    if(type == this.allowedType[j]) isAllowed = true;
                                }
                                if(!isAllowed){
                                    alert('유효하지 않은 파일유형의 파일이 포함되어 있습니다.');
                                    return false;
                                }

                                // 파일 크기 검사
                                var limitByteSize = 10 * 1048576;
                                if(file.size > limitByteSize){
                                    alert('10MB가 넘는 파일이 포함되어 있습니다.');
                                    return false;
                                }

                                var thumbnail;
                                switch(type){
                                    case 'image':
                                        thumbnail = url;
                                        break;
                                    case 'video':
                                        thumbnail = '/static/images/service/thumbnail_video.gif';
                                        break;
                                    case 'audio':
                                        thumbnail = '/static/images/service/thumbnail_audio.gif';
                                        break;
                                }

                                // 파일 업로드 리스트 추가
                                this.uploadList.push({
                                    fileName:file.name,
                                    progress:0,
                                    type:type,
                                    thumbnail:thumbnail,
                                    loadedComplete:false
                                });
                                
                                // progress event
                                var reader = new FileReader();
                                reader.idx = i + len;
                                reader._this = this;
                                reader.addEventListener('progress', function(e){
                                    var idx = e.currentTarget.idx;
                                    var _this = e.currentTarget._this;
                                    _this.uploadList[idx].progress = e.loaded / e.total * 100;
                                });
                                reader.addEventListener('loadend', function(e){
                                    var idx = e.currentTarget.idx;
                                    var _this = e.currentTarget._this;
                                    _this.uploadList[idx].loadedComplete = true;
                                });
                                reader.readAsText(file);
                            }
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
        FileUploadPopup:FileUploadPopup
    }
});