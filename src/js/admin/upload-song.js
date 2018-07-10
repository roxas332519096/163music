{
    let view = {
        el:'.uploadArea',
        find(selector){
            return $(this.el).find(selector)[0];
        }
    }
    let model = {};
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.initQiniu();
        },
        initQiniu(){
            var uploader = Qiniu.uploader({
                runtimes: 'html5', 
                browse_button: this.view.find('#uploadButton'),
                uptoken_url : 'http://localhost:8888/uptoken',
                domain: 'pav3c7ntg.bkt.clouddn.com', 
                get_new_uptoken: false,
                max_file_size: '40mb',
                dragdrop: true,
                drop_element: this.view.find('#uploadContainer'),
                auto_start: true,
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {

                        });
                    },
                    'BeforeUpload': function(up, file) {
                        window.eventHub.emit('beforeupload');
                    },
                    'UploadProgress': function(up, file) {
                       
                    },
                    'FileUploaded': function(up, file, info) {
                        window.eventHub.emit('afterupload');
                         var domain = up.getOption('domain');
                         var response = JSON.parse(info.response);
                         var sourceLink = 'http://' + domain + '/' + encodeURIComponent(response.key);
                         window.eventHub.emit('new',{
                             url:sourceLink,
                             name:response.key
                         })
                    },
                    'Error': function(up, err, errTip) {

                    },
                    'UploadComplete': function() {

                    },
                }
            });
        }

    }
    controller.init(view,model);
}
