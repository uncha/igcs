define(function () {
    var VideoPlayer = Vue.component('VideoPlayer', function(resolve, reject){
        var data = {
            sources:[
                {src:'https://media.w3.org/2010/05/sintel/trailer.ogv', type:'video/ogg'},
                {src:'https://media.w3.org/2010/05/sintel/trailer.mp4', type:'video/mp4'},
                {src:'https://media.w3.org/2010/05/sintel/trailer.webm', type:'video/webm'}
            ],
            playState:true,
            totalTime:0,
            currentTime:0,
            video:undefined,
            centerButtonShow:false,
            timerId:undefined
        }
        
        $.ajax({
            url:'/template/media/video_player.html',
            type:'get',
            dataType:'html',
            success:function(template){
                resolve({
                    template:template,
                    data:function(){
                        return data;
                    },
                    computed:{
                        currentRange:function(){
                            return Math.round(this.currentTime / this.totalTime * 100);
                        },
                        centerPlayControlClass:function(){
                            return (this.playState) ? 'fa-pause-circle-o' : 'fa-play-circle-o';
                        },
                        playControlClass:function(){
                            return (this.playState) ? 'fa-pause' : 'fa-play';
                        }
                    },
                    filters:{
                        time: function(value){
                            value = Math.floor(value * 100) / 100;
                            
                            if(!value.toString().split('.')[1] || value.toString().split('.')[1].length == 0){
                                value += '00';
                            } else if(value.toString().split('.')[1].length == 1){
                                value += '0';
                            }

                            return value;
                        }
                    },
                    methods:{
                        togglePlay:function(){
                            if(this.playState){
                                this.playState = false;
                                this.video.pause();
                            } else {
                                this.playState = true;
                                this.video.play();
                            }
                        },
                        videoAreaMouseover:function(){
                            if(this.timerId) clearTimeout(this.timerId);
                            this.centerButtonShow = true;
                        },
                        videoAreaMouseout:function(){
                            var _this = this;
                            if(this.timerId) clearTimeout(this.timerId);
                            this.timerId = setTimeout(function(){
                                _this.centerButtonShow = false;
                            }, 100);
                        },
                        onTimeUpdate:function(e){
                            this.currentTime = this.video.currentTime;
                        },
                        onLoadedData:function(e){
                            this.video = e.target;
                            this.totalTime = this.video.duration;
                        },
                        onEnded:function(e){
                            this.playState = e.target && !e.target.ended; //ended:true means not playing -> this.playState:false
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
        VideoPlayer:VideoPlayer
    }
});