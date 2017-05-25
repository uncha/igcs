define(function () {
    var SelectMenu = Vue.component('SelectMenu', function(resolve, reject){
        $.ajax({
            url:'/template/form/select_menu.html',
            type:'get',
            dataType:'html',
            success:function(template){
                resolve({
                    props:['list', 'selectId'],
                    template:template,
                    methods:{
                        listClick:function(data, key){
                            this.$emit('selected', data, key);
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
        SelectMenu:SelectMenu
    }
});