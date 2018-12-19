const MongoClient =require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test',(error,db)=>{
    if(error){
        return console.log('Unable to Connect to server.');
    }
    console.log('Connected to server..');
    db.collection('testes').insertOne({
      _id: 123,
      text:'Something to test',
      completed: false
    },(err,result)=>{
      if(err){
          return console.log('Unable to insert!!',err);
      }      
        console.log(JSON.stringify(result.ops,undefined,2));
    });
    db.close();
});