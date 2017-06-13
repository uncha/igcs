define(function () {
    var Confirm = Vue.component('Confirm', function(resolve, reject){
        $.ajax({
            url:'/template/form/confirm.html',
            type:'get',
            dataType:'html',
            success:function(template){
                resolve({
                    props:['title', 'question'],
                    template:template,
                    mounted:function(){
                        var _this = this;
                        $(window).resize(function(){
                            var $confirmWrap = $(_this.$el).find('.confirm_wrap');
                            $confirmWrap.css({
                                left:'50%',
                                top:'50%',
                                marginLeft:-1 * $confirmWrap.outerWidth() / 2,
                                marginTop:-1 * $confirmWrap.outerHeight() / 2
                            });
                            
                            if($confirmWrap.offset().left < 0) $confirmWrap.css({left:0, marginLeft:0});
                            if($confirmWrap.offset().top < 0) $confirmWrap.css({top:0, marginTop:0});
                        });
                        $(window).trigger('resize');
                    },
                    methods:{
                        onCloseClick:function(){
                            this.$emit('confirm-complete', false);
                        },
                        onConfirmClick:function(isConfirm){
                            this.$emit('confirm-complete', isConfirm);
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
        Confirm:Confirm
    }
});