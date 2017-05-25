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