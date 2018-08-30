const {MongoClient,ObjectID} = require('mongodb');
var obj = new ObjectID;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) =>{
    if (err){
        return console.log('Unable to connect MongoDB Server');
    }
    console.log('Connected to MongoDB');
    const db = client.db('TodoApp');
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b85fea80913134ff0e9a639')
    // },{
    //     $set:{
    //         completed:true
    //     }
    // },{
    //     returnOriginal:false
    // }).then((results) =>{
    //     console.log(results);
    // })
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b8645b81021952c093db626')
    },{
        $inc:{
            age:1
        }
    },{
        returnOriginal:false
    }).then((results) =>{
        console.log(results);
    });
    //client.close();
});