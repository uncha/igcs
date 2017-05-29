define(function () {
    var child;
    var dataUrl;
    var popupCont = {
        render:function(createElement){
            return createElement(child, {
                props:{
                    dataUrl:dataUrl
                }
            });
        }
    }
    
    var Popup = Vue.component('popup', function(resolve, reject){
        $.ajax({
            url:'/template/popup/popup.html',
            type:'get',
            dataType:'html',
            success:function(template){
                resolve({
                    props:['child', 'id', 'dataUrl'],
                    template:template,
                    components:{
                        'popup-cont':popupCont
                    },
                    created:function(){
                        child = this.child;
                        dataUrl = this.dataUrl;
                    },
                    methods:{
                        onCloseClick:function(){
                            this.$emit('popup-close', this.id);
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
        Popup:Popup
    }
});