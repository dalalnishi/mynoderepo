const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password='123abc!';
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log(hash);
    })
});

var hashedpwd='$2a$10$CLe6uUMYbRlT1Pz7Uu76ReO4UotjNNE7PZwerLdZPmV6PwMLbGPGG';

bcrypt.compare(password,hashedpwd,(err,res)=>{
    console.log(res);
});



/*var data={
    id:10
};

var token=jwt.sign(data,'123abc');
console.log(token);

var decoded=jwt.verify(token,'123abc');
console.log('decoded',decoded);

*/
/*var message='I am user number 3';
var hash=SHA256(message).toString();
console.log(`message: ${message}`);
console.log(`hash: ${hash}`);

var data={
    id:4
};

var token={
    data,
    hash:SHA256(JSON.stringify(data)+'something').toString()
}

token.data.id=5;
token.hash=SHA256(JSON.stringify(token.data)).toString();

var resHash=SHA256(JSON.stringify(token.data)+'something').toString();

if(resHash===token.hash){
    console.log('Same');
}else{
    console.log('Changed');
}*/