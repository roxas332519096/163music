{
    let view = {
        el:'.updatecover',
        clockupdate(){
            $(this.el).addClass('active');
        },
        unclockupdate(){
            $(this.el).removeClass('active');
        }
    }
    let controller = {
        init(view){
            this.view = view;
            this.bindEventHub();
        },
        bindEventHub(){
            window.eventHub.on('clockupdate',()=>{
                this.view.clockupdate();
            })
            window.eventHub.on('unclockupdate',()=>{
                this.view.unclockupdate();
            })
        }
    }
    controller.init(view);
}