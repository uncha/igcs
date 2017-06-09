define(function () {
    var parent;
    var popupCont = {
        render:function(createElement){
            return createElement(parent.child, {
                props:{
                    dataUrl:parent.dataUrl
                },
                on:{
                    "cont-mounted":function(){
                        parent.contMounted();
                    }
                }
            });
        }
    }
    
    Popup = Vue.component('popup', function(resolve, reject){
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
                        parent = this;
                    },
                    methods:{
                        onCloseClick:function(){
                            this.$emit('popup-close', this.id);
                        },
                        contMounted:function(){
                            var $popupWrap = $(this.$el).find('.popup_wrap');
                            $popupWrap.css({
                                left:'50%',
                                top:'50%',
                                marginLeft:-1 * $popupWrap.outerWidth() / 2,
                                marginTop:-1 * $popupWrap.outerHeight() / 2
                            });
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