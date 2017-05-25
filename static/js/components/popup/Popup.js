define(function () {
    var child;
    var popupCont = {
        render:function(createElement){
            return createElement(
                child,
                this.$slots.default
            );
        }
    }
    
    var Popup = Vue.component('popup', function(resolve, reject){
        $.ajax({
            url:'/template/popup/popup.html',
            type:'get',
            dataType:'html',
            success:function(template){
                resolve({
                    props:['child', 'id'],
                    template:template,
                    components:{
                        'popup-cont':popupCont
                    },
                    created:function(){
                        child = this.child;
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