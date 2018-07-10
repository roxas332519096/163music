{
    let view = {
        el:'.newSong',
        init(){
            this.$el = $(this.el);
        },
        template:`新建歌曲`,
        render(data){
            this.$el.html(this.template);
        }
    }

    let model = {}

    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.init();
            this.view.render(this.model.data);
            this.bindEvents();
            this.bindEventHub();
            
        },
        active(){
            this.view.$el.addClass('active');
        },
        deactive(){
            this.view.$el.removeClass('active');
        },
        bindEvents(){
            this.view.$el.on('click',()=>{
                window.eventHub.emit('new');
                window.eventHub.emit('unclockupdate');
            })
        },
        bindEventHub(){
            window.eventHub.on('new',()=>{
                this.active();
            })
            window.eventHub.on('select',(data)=>{
                this.deactive();
            })
        }

    }
    controller.init(view,model);
}
