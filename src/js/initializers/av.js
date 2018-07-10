{
    let APP_ID = 'ejr091xlFV1M4LkS6VMO7v7H-gzGzoHsz';
    let APP_KEY = 'XUiaxCUUNb9YhT31KmIvFyyt';

    AV.init({
    appId: APP_ID,
    appKey: APP_KEY
    });
    /*
    //创建数据库
    let TestObject = AV.Object.extend('Playlist');
    //创建一条记录
    let testObject = new TestObject();
    //保存记录
    testObject.save({
    name: 'test',
    cover: 'url',
    creatorId: 'id',
    description: 'test',
    songs: ['1','2','3']
    }).then(function(object) {
    alert('数据提交成功!');
    })
    */
}