const fs=require('fs');

var getAll=()=>{
     try{
        var notestring=fs.readFileSync("notes_data.json");
        return JSON.parse(notestring);
    }catch(e){
        return [];
    }
    
};

var saveNotes=(notesarr)=>{
    fs.writeFileSync('notes_data.json',JSON.stringify(notesarr));
    
};

var addNote=(title,body)=>{
    var notesarr=getAll();//Get existing notes first
    var note={
        title,
        body
    };  
   
     var duplicates=notesarr.filter((note)=>note.title===title);
    
    if(duplicates.length===0){
       notesarr.push(note); 
       saveNotes(notesarr);
       return note;
    }

};

var removeNote=(title)=>{
    var notesarr=getAll();
    
    var found=notesarr.filter((note)=>note.title!=title);//returns all notes except specified
    //console.log(found);
    saveNotes(found);  
    return notesarr.length!=found.length;
    
};

var getNote=(title)=>{
    var notesarr=getAll();
    var found=notesarr.filter((note)=>note.title==title);
    return found[0];
    
};

module.exports={
    addNote,
    removeNote,
    getNote,
    getAll
}