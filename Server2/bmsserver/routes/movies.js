var express=require('express')
var router=express.Router()
var db=require('./connection');

router.get('/moviesData',(req,res)=>{
    db.query('select * from movies',(err,row)=>{
        if(err){
            res.send('Error while fetching Data'+JSON.stringify(err))
        }else{
            res.json(row);
        }
    })
})

module.exports=router;

