require.config({
    paths: {
        Popup: './components/popup/Popup',
        ViewPopup: './components/popup/ViewPopup',
        ImageUploadPopup: './components/popup/ImageUploadPopup',
        FileUploadPopup: './components/popup/FileUploadPopup',
        Confirm:'./components/form/Confirm',
        SelectMenu:'./components/form/SelectMenu',
        VideoPlayer:'./components/media/VideoPlayer',
        Tag:'./components/form/Tag'
    }
});

requirejs(['Popup', 'ViewPopup', 'ImageUploadPopup', 'FileUploadPopup', 'Confirm', 'SelectMenu', 'VideoPlayer', 'Tag'], function(){
	var data = {
		lastId:0,
		popupList:[/*{id:1, child:'ImagePopup'}*/],
		confirmShow:false,
		confirmText:{
			title:'타이틀',
			question:'질문'
		},
		siteSelectMenuShow:false,
		siteSelectId:0,
		siteSelectMenuList:[
			{text:'www.ionsite.com', data:'www.ionsite.com'}, 
			{text:'www.mybigsite.com', data:'www.mybigsite.com'}, 
			{text:'www.eform.io', data:'www.eform.io'}
		]
	}
	
	var app = new Vue({
		el: '#app',
		data:data,
		methods:{
			createPopup:function(child, dataUrl){
				this.lastId++;
				this.popupList.push({id:this.lastId, child:child, dataUrl:dataUrl});
			},
			onPopupClose:function(id){
				for(var i in this.popupList){
					var list = this.popupList[i];
					if(id == list.id){
						this.popupList.splice(i, i+1);
					}
				}
			},
			deleteConfirm:function(){
				this.confirmText.title = '파일삭제';
				this.confirmText.question = '삭제하시겠습니까?';
				this.confirmShow = true;
			},
			onConfirmComplete:function(isConfirm){
				console.log(isConfirm);
				this.confirmShow = false;
			},
			siteSelectMenu:function(){
				(this.siteSelectMenuShow) ? this.siteSelectMenuShow = false : this.siteSelectMenuShow = true;
			},
			onSelected:function(data, key){
				console.log(data);
				this.siteSelectId = key;
				this.siteSelectMenuShow = false;
			}
		}
	});
});


