{
    let view = {
        el:'main',
        init(){
            this.$el = $(this.el);
        },
        render(data){
           this.$el.find('img').attr('src',data.cover);
           this.$el.find('.title').html(data.name);
           this.$el.find('.summry').html(data.summry);
        }
    }
    let model = {
        data:{
            id:'',
            name:'',
            summry:'',
            cover:'',
        },
        setId(id){
            this.data.id = id;
        },
        getData(){
            var query = new AV.Query('playlist');
            return query.get(this.data.id).then((playlist)=>{
                Object.assign(this.data,playlist.attributes)
                return playlist
            })
        }
    }
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.init();
            this.id = this.getId();
            this.model.setId(this.id)
            this.model.getData().then(()=>{
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