{
    let view = {
        el:'',
        init(){
            this.$el = $(this.$el);
        }
    }
    let model = {

    }
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.init();
            this.bindEvents();
            this.bindEventHub();
        },
        bindEvents(){

        },
        bindEventHub(){

        }
    }
    controller.init(view,model);
}