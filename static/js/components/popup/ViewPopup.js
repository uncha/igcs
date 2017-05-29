define(function () {
    var ViewPopup = Vue.component('ViewPopup', function(resolve, reject){
        $.ajax({
            url:'/template/popup/view_popup.html',
            type:'get',
            dataType:'html',
            success:function(template){
                resolve({
                    template:template,
                    props:['dataUrl'],
                    beforeMount:function(){
                        dataLoad(this, this.dataUrl);
                    },
                    data:function(){
                        return {
                            title:"",
                            contentType:""
                        };
                    },
                    methods:{
                        prevClick:function(){
                            dataLoad(this, '/data/view.json');
                        },
                        nextClick:function(){
                            dataLoad(this, '/data/view02.json');
                        }
                    }
                });
            },
            error:function(xhr){
                console.log(xhr);
            }
        });
    });

    function dataLoad(tg, dataUrl){
        $.ajax({
            url:dataUrl,
            type:'get',
            dataType:'json',
            success:function(data){
                tg.title = data.title;
                tg.contentType = data.contentType;
            }
        });
    }
    
    return {
        ViewPopup:ViewPopup
    }
});


















