const {MongoClient,ObjectID} = require('mongodb');
var obj = new ObjectID;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) =>{
    if (err){
        return console.log('Unable to connect MongoDB Server');
    }
    console.log('Connected to MongoDB');
    const db = client.db('TodoApp');
    // db.collection('Users').deleteMany({name:'Pham'}).then((results) =>{
    //     console.log(results);
    // })
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b86067660d0bf0ad440755d')
    }).then((results) =>{
        console.log(results);
    });
    //client.close();
});