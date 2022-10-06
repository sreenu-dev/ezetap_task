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
router.get('/theatresData',(req,res)=>{
    db.query('select * from theatre',(err,row)=>{
        if(err){
            res.send(JSON.stringify(err))
        }else{
            res.json(row);
        }
    })
})
router.get('/theatremoviesData',(req,res)=>{
    db.query('select * from theatremovies',(err,row)=>{
        if(err){
            res.send(JSON.stringify(err))
        }else{
            res.json(row);
        }
    })
})
router.get('/adminData',(req,res)=>{
    var movieData=[]
    var theatreData=[]
    var theatreMovieData=[];
    db.query('select * from movies',(err,row)=>{
        if(err){
            console.log("Error!!");
        }else{
            movieData=row;
        }
        db.query('select * from theatre',(err,row)=>{
            if(err){
                console.log("Error!!");
            }else{
                theatreData=row;
            }
            db.query('select * from theatremovies',(err,row)=>{
                if(err){
                    console.log("Error!!");
                }else{
                    theatreMovieData=row;
                }
                res.json({movies:movieData,theatres:theatreData,theatreMovies:theatreMovieData})
            })
        })
    })
})



module.exports=router;

