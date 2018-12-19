const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var UserSchema=new mongoose.Schema({
   email:{
       type:String,
       required: true,
       minlength: 1,
       trim: true,
       unique:true,
       validate:{
           /*validator:(value)=>{
               return validator.isEmail(value);
           },*/
           validator: validator.isEmail,
           message:'Not a valid email!'
       }
   },password:{
       type:String,
       required:true,
       minlength:8
   },
    tokens:[{
        access:{
            type: String,
            required:true
        },
        token:{
            type: String,
            required:true
        }
    }]
    
});
   
UserSchema.statics.findByToken=function(token){
    var user=this;
    var decoded;
    try{
        decoded=jwt.verify(token,'abc123');
    }catch(e){
        return Promise.reject();
    }
    return user.findOne({
        _id: decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    })
};
//creating instance
/*var users= new user({
   text: 'nish@example.com' 
});

users.save().then((doc)=>{
        console.log('Saved user',doc)
},(e)=>{
   console.log('Unable to save user',e) ;
});
*/

UserSchema.methods.generateAuthToken=function(){
    var u=this;
    console.log("witho token",u);
    var access='auth';
    var token=jwt.sign({_id: u._id.toHexString(),access},'abc123').toString();
    u.tokens.push({access,token});
    console.log("with token",u);
   
    return u.save().then(()=>{
            return token;
    });
    
};

UserSchema.statics.findByCredentials=function(email,password){
    var user=this;
    
    return user.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,user.password,(err,res)=>{
                if(res){
                    resolve(user);
                }else{
                    reject();
                }
            })
        })
    })
};

UserSchema.methods.removeToken=function(token){
  var user=this;
    return user.update({
        $pull:{
            tokens:{
                token:token
            }
        }
    })
};

var user=mongoose.model('user',UserSchema);
module.exports={user};