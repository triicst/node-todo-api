var mongoose = require('mongoose');
var User = mongoose.model('User',{
    email:{
        type: String,
        required: true,
        trim:true,
        minlength:1
    }    
});
var Group = mongoose.model('Group',{
    role:{
        type: String,
        required: true,
        trim: true
    }
})
module.exports = {User,Group};