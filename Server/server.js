const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send("Hello Express");
})
app.post('/hell',(req,res)=>{
    res.send("Cannot display data from Post")
})

app.listen(4000,()=>{
    console.log("Listening in PORT 4000")
})

