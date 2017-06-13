define(function () {
    return {
    	mounted:function(){
            this.$emit('cont-mounted');
        },
        updated:function(){
            this.$emit('cont-mounted');
        }
    }
});