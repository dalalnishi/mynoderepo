const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');

//var id= "5c13916cdca05ad41ae1304f";
//var id= "6c13916cdca05ad41ae1304f";
var id= "6c13916cdca05ad41ae1304f1";
const {ObjectID}=require('mongodb');

if(!ObjectID.isValid(id)){
    return console.log('ID not valid!!!')
}

/*Todo.find({
    _id: id
}).then((todos)=>{
    console.log('Todos: ',todos);
});

//Below both are same
Todo.findOne({
    _id: id
}).then((todo)=>{
    console.log('Todo: ',todo);
});*/

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('Id not found!!')
    }
    console.log('Todo: ',todo);
}).catch((e)=>console.log(e));
