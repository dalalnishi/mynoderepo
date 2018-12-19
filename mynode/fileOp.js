const fs=require('fs');

var obj={
    title:"some title",
    body:"some body"
};

var objstr=JSON.stringify(obj);
fs.writeFileSync('notes.js',objstr);

var objfstr=fs.readFileSync('json.js');
var objs=JSON.parse(objfstr);
console.log(objs);