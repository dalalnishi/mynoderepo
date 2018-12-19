const MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test',(err,db)=>{
    if(err){
        return console.log('Connection Error: ',err);
    }
    console.log('Connection Succeeded!!');
    
    /*db.collection('testes').deleteMany({text:'Something to test'}).then((result)=>{
        console.log(result.ops);
    })*/
    
    /*db.collection('testes').deleteOne({text:'Eat to lunch'}).then((result)=>{
        console.log(result.ops);
    })*/
    
    db.collection('testes').findOneAndDelete({completed: true}).then((result)=>{
        console.log(result);
    })
    db.close();
});