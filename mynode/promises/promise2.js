var asyncAdd = (a,b)=>{
    return new Promise((resolve,reject)=>{
        if(typeof a === 'number' && typeof b === 'number'){
            resolve(a+b);
        }else{
            reject("Number Please!!")
        }
    });
};

asyncAdd(5,10).then((res)=>{
   console.log(res); 
},(error)=>{
    console.log(error);
});
