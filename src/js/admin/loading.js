{
    let view = {
        el:'.loadingcover',
        beforeupload(){
            $(this.el).addClass('active');
        },
        afterupload(){
            $(this.el).removeClass('active');
        }
    }
    let controller = {
        init(view){
            this.view = view;
            this.bindEventHub();
        },
        bindEventHub(){
            window.eventHub.on('beforeupload',()=>{
                this.view.beforeupload();
            })
            window.eventHub.on('afterupload',()=>{
                this.view.afterupload();
            })
        }

    }
    controller.init(view);
}