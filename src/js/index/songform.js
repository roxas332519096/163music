{
    let view = {
        el:'.songform ul',
        init(){
            this.$el = $(this.el);
        },
        template:`
        <li>
            <a href="./playlist.html?id=__id__">
                <img src="#" alt="">
                <span class="name">__name__</span>
            </a>
        </li>
        `,
        render(data){
            let {playlists} = data;
            playlists.map((playlist)=>{
                let $li = $(this.template
                    .replace('__name__',playlist.name)
                    .replace('__id__',playlist.id)
                );
                $li.find('img').attr('src',playlist.cover);
                this.$el.append($li);
            })
        }
    }
    let model = {
        data :{
            playlists:[]
        },
        find(){
            var query = new AV.Query('playlist');
            return query.find().then((playlists)=>{
                this.data.playlists = playlists.map((playlist)=>{
                    return  {
                        id:playlist.id, 
                        cover:playlist.attributes.cover,
                        name:playlist.attributes.name,
                        summry:playlist.attributessummry
                    }
                })
                return playlists;
            })
        }
    }
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.init();
            this.getPlaylists();
        },
        getPlaylists(){
            return this.model.find().then(()=>{
                this.view.render(this.model.data);
            })
        }
    }
    controller.init(view,model);
}