const exp=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=exp();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url} `;
    
    fs.appendFileSync('server.log',log + "\n");
    next();
    
});


app.use(exp.static(__dirname + '/public'));

app.set('View Engine','hbs');

app.get('/',(req,res)=>{
   res.render('home.hbs',{
       user:"Nishi",
       //today:new Date()
   });
});

app.use((req,res,next)=>{
    res.render('maintenance.hbs');    
});

app.get('/about',(req,res)=>{
    //res.send("Inside About Page");
    res.render('about.hbs',{
        pageTitle:'About Us',
        //currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMsg:"Unable to handle request"
    });
});

app.listen(3000);