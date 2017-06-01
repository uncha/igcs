define(function () {
    var Tag = Vue.component('Tag', function(resolve, reject){
        $.ajax({
            url:'/template/form/tag.html',
            type:'get',
            dataType:'html',
            success:function(template){
                resolve({
                    props:['tagList'],
                    template:template,
                    data:function(){
                        return {
                            inputTagName:'',
                            lists:this.tagList || []
                        }
                    },
                    methods:{
                        onAddTag:function(){
                            if(!this.inputTagName) return;

                            this.lists.push(this.inputTagName);
                            this.inputTagName = '';
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
        Tag:Tag
    }
});