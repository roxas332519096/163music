{
    let view = {
        el:'.tabs > li',
        init(){
            this.$el = $(this.el);
        },
        active(e){
            let $li = $(e.currentTarget);
            $li.addClass('active').siblings().removeClass('active');
            var index = $li.index();
            $('section').removeClass('active').eq(index).addClass('active');
        }
    }
    let controller = {
        init(view){
            this.view = view;
            this.view.init();
            this.bindEvents();
        },
        bindEvents(){
            this.view.$el.on('click',(e)=>{
                this.view.active(e);
            })
        }
    }
    controller.init(view);
}