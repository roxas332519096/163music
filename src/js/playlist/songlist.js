{
    let view = {
        el:'.songslist > ul',
        init(){
            this.$el = $(this.el);
        },
        template:` 
        <li>
            <div class="index">__index__</div>
            <div class="song">
                <div class="songitem">
                    <span class="name">__name__</span>
                    <span class="singer">__singer__</span>
                </div>
                <div>
                    <a href='./player.html?id=__id__'>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofang1"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </li>
        `,
        render(data){
            let {songs} = data;
            songs.map((song,index)=>{
                let $li = $(this.template
                    .replace('__name__',song.name)
                    .replace('__singer__',song.singer)
                    .replace('__id__',song.id)
                    .replace('__index__',index+1)
                )
                this.$el.append($li);
            })
        }
    }
    let model = {
        data :{
            songs:[]
        },
        find(id){
            var playlist = AV.Object.createWithoutData('playlist',id);
            var query = new AV.Query('Song');
            query.equalTo('dependent',playlist);
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
                console.log(songs)
                return songs;
            })

        },
    }
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.init();
            this.id = this.getId();
            this.getAllSongs(this.id);
        },
        getAllSongs(id){
            return this.model.find(id).then(()=>{
                this.view.render(this.model.data);
            })
        },
        getId(){
            let search = window.location.search;
            let id = search.slice(4);
            return id;
        }
    }
    controller.init(view,model);
}