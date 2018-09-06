const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var password = 'abc123!';
bcrypt.genSalt(10,(err,salt) =>{
    bcrypt.hash(password,salt,(err, hash)=>{
        console.log(hash);
    });
});
var hashPassword = '$2a$10$qXMIo6jouo5/f1kZNA8J.eYW9W2V0e.onW.Yw/xfKC9qZ2yc41VOS'
bcrypt.compare(password,hashPassword, (err,res) =>{
    console.log(res);
});
// var data = {
//     id: 10
// };
// var token = jwt.sign(data,'123abc');
// console.log(token);
// var decode = jwt.verify(token,'123abc');
// console.log(decode);
// var message ='My name Tri Pham';
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hasing: ${hash}`);
// var data = {
//     id:4
// }
// var token ={
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecrect').toString()
// }
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecrect').toString();
// if (resultHash === token.hash){
//     console.log('Data not changed');
// }else{
//     console.log('Data was change');
// }
