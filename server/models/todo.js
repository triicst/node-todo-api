var mongoose = require('mongoose');
var Todo = mongoose.model('Todo',{
    text:{
         type:String,
         required: true,
         minlength:1,
         trim:true
     },
     completed:{
         type:Boolean,
         default:false
     },
     completedAt:{
         type:Number, 
         default:null
     }
});

// var otherTodo = new Todo({
//     text:'  Pham  Minh   Tri   '
// });
// otherTodo.save().then((doc)=>{
//     console.log('Save to todo',doc);
// },(err)=>{
//     console.log('Unable save todo',err);
// });
module.exports = {Todo};