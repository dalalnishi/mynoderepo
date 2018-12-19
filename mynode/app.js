const nodes=require('./notes.js');
const yargs=require('yargs');

const cmd=process.argv[2];
const argv=yargs.argv;
      
if(cmd==='add'){
    var n=nodes.addNote(argv.title,argv.body);
    if(n){
        console.log(n.title+" "+" added to list.");
    }
    else{
        console.log("Unable to add to list.");
    }
}
else if(cmd==='list'){
     var all=nodes.getAll();
    all.forEach((note)=>{
        console.log(note.title+" "+note.body);
    });
}
else if(cmd==='read'){
    var n=nodes.getNote(argv.title);
    if(n){
        console.log(n.title+ " : " +n.body);
    }
    else{
        console.log("Unable to Read.");
    }
}
else if(cmd==='remove'){
    var r=nodes.removeNote(argv.title);
    var msg= r? 'Removed':'Not Found!!';
    console.log(msg);
}
else{
    console.log('Command not found!!');
}