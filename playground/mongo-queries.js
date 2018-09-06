const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
var id = '5b87f3c06fa05b321c0035ea';
 if (!ObjectID.isValid(id)){
     console.log('ID not valid');
 }
// Todo.find({
//     _id:id
// }).then((todos) =>{
//     console.log('Todos',todos);
// },(e) =>{
//     console.log(e);
// });  
// Todo.findOne({
//     _id: id
// }).then( (todos) =>{
//     console.log('Todos 1: ',todos)
// },(e) =>{
//     console.log(e);
// });
 Todo.findById(id).then((todo) =>{
     if (!todo){
         return console.log('Id not found');
     }
     console.log('Todo By Id',todo);
 }).catch((e) =>{
     console.log(e);
 });