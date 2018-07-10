{
    let view = {
        el:'.newsongs > ul',
        init(){
            this.$el = $(this.el);
        },
        template:`
        <li>
            <div class="songitem">
                <span class="name">__name__</span>
                <span class="singer"><img src="./img/sq.png">__singer__</span>
            </div>
            <div>
                <a href='./player.html?id=__id__'>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang1"></use>
                    </svg>
                </a>
            </div>
        </li>
        `,
        render(data){
            let {songs} = data;
            songs.map((song)=>{
                let $li = $(this.template
                    .replace('__name__',song.name)
                    .replace('__singer__',song.singer)
                    .replace('__id__',song.id)
                )
                this.$el.append($li);
            })
        }
    }
    let model = {
        data :{
            songs:[]
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
                return songs;
            })
        }
    }
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.init();
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

        },
        bindEventHub(){

        }
    }
    controller.init(view,model);
}