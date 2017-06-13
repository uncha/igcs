require.config({
	paths: {
		SelectMenu:'./components/form/SelectMenu'
	}
});

requirejs(['SelectMenu'], function(){
	var data = {
		mainServiceNavShow: false,
		/* site select drop-down menu */
		siteSelectMenuShow:false,
		siteSelectId:0,
		siteSelectMenuList:[
			{text:'www.ionsite.com', data:'www.ionsite.com'},
			{text:'www.mybigsite.com', data:'www.mybigsite.com'},
			{text:'www.eform.io', data:'www.eform.io'}
		],
		/* sub-service select drop-down menu */
		subServiceNavShow: false,
		subServiceSelectId: 0,
		subServiceList: [
			{text:'Dashboard', data:'Dashboard'},
			{text:'Web Builder', data:'Web Builder'},
			{text:'Report Manager', data:'Report Manager'}
		]

	}

	var main = new Vue({
		el: '#main',
		data: data,
		methods:{
			siteSelectMenu:function(){
				this.siteSelectMenuShow = !this.siteSelectMenuShow;
				if (this.siteSelectMenuShow){
					$('#black').show();
				}else {
					$('#black').hide();
				}
			},
			onSiteSelected:function(data, key){
				this.siteSelectId = key;
				this.siteSelectMenuShow = false;
				$('#black').hide();
			},
			onMainNavClicked:function(){
				this.mainServiceNavShow = !this.mainServiceNavShow;
				if (this.mainServiceNavShow){
					$('#black').show();
				}else {
					$('#black').hide();
				}
			},
			onSubNavClicked: function(){
				this.subServiceNavShow = !this.subServiceNavShow;
				if (this.subServiceNavShow){
					$('#black').show();
				}else {
					$('#black').hide();
				}
			},
			onSubNavSelected:function(data, key){
				this.subServiceSelectId = key;
				this.subServiceNavShow = false;
				$('#black').hide();
			}
		}
	});
});
