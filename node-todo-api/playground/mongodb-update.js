const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/test',(err,db)=>{
    if(err){
        return console.log('Unable to connect to server!!!',err);
    }
    console.log('Connection Succeeded!!!');
    
    /*db.collection('testes').findOneAndUpdate({_id:new ObjectID('5c134682b16e6aa198dd0be1')
        },{
        $set:{
         completed:true   
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    })*/
    
   
    db.close();
});