{
    let view = {
        el:'.songList-container',
        init(){
            this.$el = $(this.el);
        },
        template:`
        <ul class="songList"></ul>
        `,
        render(data){
            this.$el.html(this.template);
            let {songs,selectSongId} = data;
            let liList = songs.map((song)=>{
                let $li = $('<li></li>').text(song.name).attr('data-song-id',song.id);
                if(song.id === selectSongId){
                    $li.addClass('active');
                }
                return $li;
            });
            this.$el.find('ul').empty();
            liList.map((domLi)=>{
                this.$el.find('ul').append(domLi);
            })
        },
        clearActive(){
            this.$el.find('.active').removeClass('active');
        }
    }

    let model = {
        data:{
            songs:[],
            selectSongId:null
        },
        find(){
            var query = new AV.Query('Song');
            return query.find().then((songs)=>{
                this.data.songs = songs.map((song)=>{
                    return  {
                        id:song.id, 
                        url:song.attributes.url,
                        cover:song.attributes.cover,
                        singer:song.attributes.singer,
                        name:song.attributes.name,
                        lyric:song.attributes.lyric
                    }
                })
                console.log(this.data.songs)
                return songs;
            })
        }
    }

    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.init();
            this.view.render(this.model.data);
            this.bindEvents();
            this.bindEventHub();
            this.getAllSongs();
        },
        getAllSongs(){
            return this.model.find().then(()=>{
                this.view.render(this.model.data);
            })
        },
        bindEvents(){
            this.view.$el.on('click','li',(e)=>{
                let songId = e.currentTarget.getAttribute('data-song-id');
                this.model.data.selectSongId = songId;
                this.view.render(this.model.data);
                let data
                let songs = this.model.data.songs;
                for(let i = 0;i<songs.length;i++){
                    if(songs[i].id === songId){
                        data = songs[i];
                        break;
                    }
                }
                window.eventHub.emit('select',JSON.parse(JSON.stringify(data)))
            })
        },
        bindEventHub(){
            window.eventHub.on('new',()=>{
                this.view.clearActive();
            })
            window.eventHub.on('update',(song)=>{
                let songs = this.model.data.songs;
                for(let i = 0;i<songs.length;i++){
                    if(songs[i].id === song.id){
                        songs[i] = song;
                    }
                }
                this.view.render(this.model.data);
            })
            window.eventHub.on('create',(songData)=>{
                this.model.data.songs.push(songData);
                this.view.render(this.model.data);
            })
        }
    }
    controller.init(view,model);
}
