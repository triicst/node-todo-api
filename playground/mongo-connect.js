//const MongoClient = require('mongodb').MongoClient;
// var user = {name:'Tri Pham',age:25};
// var {name,age} = user;
//console.log(name,age);
const {MongoClient,ObjectID} = require('mongodb');
var obj = new ObjectID;
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) =>{
    if (err){
        return console.log('Unable to connect MongoDB Server');
    }
    console.log('Connected to MongoDB');
    const db = client.db('TodoApp');
    // db.collection('Todos').insertOne({
    //     text:'To do something',
    //     completed:false
    // },(err,result) =>{
    //     if (err){
    //         return console.log('Unable to insert todo',err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined,2));
    // })
    // db.collection('Users').insertOne({
    //     name: 'Tri Pham',
    //     age: 25,
    //     Location: 'Ho Chi Minh'
    // },(err,result) =>{
    //     if(err){
    //         return console.log('Unable to insert users',err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // })
    client.close();
});