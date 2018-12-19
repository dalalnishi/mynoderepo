//const MongoClient =require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

MongoClient.connect('mongodb://localhost:27017/test',(err,db)=>{
    if(err){
        return console.log("Can't Connect to Server!!");
    }
    console.log('Connected Successfully!!');
    //db.collection('testes').find().toArray().then((docs)=>{
    //db.collection('testes').find({text:'Something to test'}).toArray().then((docs)=>{
    /*db.collection('testes').find({ _id: new ObjectID('5c125140873d1b1aace4324b')}).toArray().then((docs)=>{
    
       console.log(JSON.stringify(docs,undefined,2)); 
    },(err)=>{
        console.log('Unable to Fetch ',err); 
    });*/
    
    db.collection('testes').find().count().then((count)=>{
    
       console.log(`Count of records: ${count} `);
    },(err)=>{
        console.log('Unable to Fetch ',err); 
    });
    db.close();
});
