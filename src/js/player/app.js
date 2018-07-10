{
    let view = {
        el:'#player',
        init(){
            this.$el = $(this.el);
        },
        template:``,
        render(data){
            $(document).find('title').html(data.name);
            this.$el.find('audio').attr('src',data.url)
            this.$el.find('.disc-cover > img').attr('src',data.cover);
            this.$el.css('background-image',`url(${data.cover})`)
            this.$el.find('h1').html(data.name);
            let allP = data.lyric.split('\n');
            for(let i = 0;i<allP.length;i++){
                let P = allP[i].replace('[','').split(']');
                let temp = P[0].split(':');
                let time = parseFloat(temp[0],10) * 60 + parseFloat(temp[1],10);
                this.$el.find('.lines').append('<p>__p__</p>');
                this.$el.find('p').eq(i).html(P[1]).attr('time',time);
            }
        },
        play(){
            let audio = this.$el.find('audio')[0];
            audio.play();
            this.$el.find('#play').addClass('playing');
            this.$el.find('#pause').addClass('playing');
            this.$el.find('.disc-cover img').addClass('playing');
            this.$el.find('.linght img').addClass('playing');
            this.showLyric();
        },
        pause(){
            let audio = this.$el.find('audio')[0];
            audio.pause();
            this.$el.find('#play').removeClass('playing');
            this.$el.find('#pause').removeClass('playing');
            this.$el.find('.disc-cover img').removeClass('playing');
            this.$el.find('.linght img').removeClass('playing');
        },
        showLyric(){
            currentTime = this.$el.find('audio')[0].currentTime;
            let allP = this.$el.find('p');
            for(var i = 0;i<allP.length;i++){
                let pretime = 0;
                let time = 0;
                time = $(allP[i]).attr('time');
                if(i > 1){
                    pretime = $(allP[i - 1]).attr('time');
                    if(currentTime > pretime && currentTime <= time){
                        this.$el.find('.lines').css('transform',`translateY(${-1 * (i-1) + 1}rem)`);
                        this.$el.find('p').eq(i-1).addClass('heightline').siblings().removeClass('heightline');
                    }
                    if(currentTime > time){
                        this.$el.find('p').eq(i).addClass('heightline').siblings().removeClass('heightline');
                    }
                }
            }
        },
    }
    let model = {
        data:{
            id:'',
            name:'',
            singer:'',
            url:'',
            cover:'',
            lyric:''
        },
        setId(id){
            this.data.id = id;
        },
        getData(){
            var query = new AV.Query('Song');
            return query.get(this.data.id).then((song)=>{
                Object.assign(this.data,song.attributes)
                return song
            })
        }
    }
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.init();
            this.id = this.getSongId();
            this.model.setId(this.id)
            this.model.getData().then(()=>{
                this.view.render(this.model.data);
            })
            this.bindEvents();
            this.bindEventHub();
        },
        bindEvents(){
            this.view.$el.on('click','#play',()=>{
                this.view.play();
            })
            this.view.$el.on('click','#pause',()=>{
                this.view.pause();
            })
            this.view.$el.find('audio')[0].onended= ()=>{
                this.view.pause();
            }
            this.view.$el.find('audio')[0].ontimeupdate=()=>{
                this.view.showLyric()
            }
        },
        bindEventHub(){

        },
        getSongId(){
            let search = window.location.search;
            let id = search.slice(4);
            return id;
        }
    }
    controller.init(view,model);
}