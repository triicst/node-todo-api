const {MongoClient,ObjectID} = require('mongodb');
var obj = new ObjectID;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) =>{
    if (err){
        return console.log('Unable to connect MongoDB Server');
    }
    console.log('Connected to MongoDB');
    const db = client.db('TodoApp');
    // db.collection('Todos').find(
    //     {
    //         _id: new ObjectID('5b85fea80913134ff0e9a639')
    //     }
    // ).toArray().then((docs) =>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err) =>{
    //     console.log('Unable fetch data',err);
    // });
    // db.collection('Todos').find().count().then((count) =>{
    //     console.log('Todos');
    //     console.log(`Number of document is : ${count}`);
    // },(err) =>{
    //     console.log('Unable fetch data',err);
    // });
    db.collection('Users').find({name:'Pham'}).toArray().then((docs) =>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err) =>{
        console.log('Unable to fetch data',err);
    });
    //client.close();
});