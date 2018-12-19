const _=require('lodash');
var {mongoose}=require('./db/mongoose');

var {Todo}=require('./models/todo');

var {user}=require('./models/user');

const express=require('express');
const bodyParser=require('body-parser');
var {ObjectID}=require('mongodb');

const port=process.env.PORT || 3000;

var app=express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo=new Todo({
        text:req.body.text
    });
    
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    })
    
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
        },(e)=>{
            res.status(400).send(e);
        })
    });


app.get('/todos/:id',(req,res)=>{
    //res.send(req.params);
    var id=req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findById(id).then((todo)=>{
    if(!todo){
        return res.status(404).send();
    }
    res.send({todo});
}).catch((e)=>{
    res.status(400).send();
})
});

//for delete
app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then((todos)=>{
        if(!todos){
            return res.status(404).send();
        }
        res.send({todos});
    }).catch((e)=>{
        res.status(400).send();
    })
});

//for fetch by id & update
app.patch('/todos/:id',(req,res)=>{
    var id=req.params.id;
    var body=_.pick(req.body,['text','completed']);
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt=new Date().getTime();
    }else{
        body.completed=false;
        body.completedAt=null;
    }
    
    Todo.findByIdAndUpdate(id,{$set:body},{new :true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
});

//POST users validation
app.post('/user',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    
    var us=new user(body);
    //console.log(us);
    us.save().then(()=>{
        //res.send(us);
        
        return us.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(us);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

var authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    
    user.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        req.user=user;
        req.token=token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    })
};

app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});

//POST /users/login
app.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    
    user.findByCredentials(body.email,body.password).then((user)=>{
        res.send(user);
    }).catch((e)=>{
        res.status(400).send();
    })
});

//DELETE logout
app.delete('/users/me/token',authenticate,(req,res)=>{
   req.user.removeToken(req.token).then(()=>{
       res.status(200).send();
   },()=>{
       res.status(400).send();
   }) 
});

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
});

module.exports={app};