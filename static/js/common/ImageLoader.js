define(function () {
	return {
		load:function(params){
			var $parent = params.$parent;
			var complete = params.complete;
			
			if($parent){
				var completeSize = 0;
				$parent.find('img').each(function(i, img){
					$(img).one('load', function(){
						completeSize++;

						if(complete && completeSize == $parent.length) complete.call(this);
					});
				});
			}
		}
	}
});