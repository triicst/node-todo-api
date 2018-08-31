const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
var port = process.env.PORT || 3000;
var app = express();
app.get('/',(req,res) =>{
    res.send('Welcome to express');
});
app.use(bodyParser.json());

app.post('/todos',(req,res) =>{
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) =>{
        res.send(doc);
    },(err) =>{
        res.status(400).send(err);
    });
});
app.get('/todos',(req,res) =>{
    Todo.find().then((todos) =>{
        res.send({todos});
    },(e) =>{
        res.status(400).send(e);
    });
});
app.get('/todos/:id',(req,res) =>{
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
        res.status(404).send();
    }
    Todo.findById(id).then((todos) =>{
        if (!todos){
            res.status(404).send();
        }
        res.send(todos);
    }).catch((e) =>{
        res.status(404).send();
    });
    //valid id
        //404 send back emty send
    //findById
        //sussess
            //if todo - sent it back
            //if not todo -sent 404 it empty body
        //error
            //404 send empty back
});
app.delete('/todos/:id',(req,res) =>{
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
        res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) =>{
        if (!todo){
            res.status(404).send();
        }
        res.send(todo);
    }).catch((e) =>{
        res.status(404).send();
    });
});
app.patch('/todos/:id',(req,res) =>{
    var id = req.params.id;
    
    var body = _.pick(req.body,['text','completed']);

    if (!ObjectID.isValid(id)){
        res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo) =>{
        if (!todo){
            res.status(404).send();
        }
        res.send(todo);
    }).catch((e) =>{
        res.status(404).send();
    });

});
app.listen(port,() =>{
    console.log(`Started on port ${port}`);
});
module.exports = {app};