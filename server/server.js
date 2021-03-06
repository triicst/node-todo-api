const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');
const {authenticator} = require('./middleware/authenticator');
const _ = require('lodash');
var port = process.env.PORT || 3000;
var app = express();
app.get('/',(req,res) =>{
    res.send('Welcome to express');
});
app.use(bodyParser.json());

app.post('/todos',authenticator, (req,res) =>{
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) =>{
        res.send(doc);
    },(err) =>{
        res.status(400).send(err);
    });
});
app.get('/todos',authenticator,(req,res) =>{
    Todo.find({
        _creator: req.user._id
    }).then((todos) =>{
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
app.post('/users',(req,res) =>{
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    user.save().then(() =>{
 //       res.send(user);
        return user.generateAuthToken();
    }).then((token) =>{
        res.header('x-auth',token).send(user);   
    }).catch((e) =>{
        res.status(400).send(e);
    });
});
app.get('/users/me',authenticator, (req,res) =>{
    res.send(req.user);
});
app.post('/users/login',(req,res) =>{
    var body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user) =>{
        return user.generateAuthToken().then((token) =>{
            res.header('x-auth',token).send(user);
        });
        //res.send(user);
    }).catch((err) =>{
        res.status(400).send(err);
    }); 
});
app.delete('/users/me/token',authenticator, (req,res) =>{
    req.user.removeToken(req.token).then(() =>{
        res.status(200).send();
    }).catch(() =>{
        res.status(400).send()
    });
});
app.listen(port,() =>{
    console.log(`Started on port ${port}`);
});
module.exports = {app};