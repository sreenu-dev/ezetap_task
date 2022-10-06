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
router.post('/saveMovie',(req,res)=>{
    var movieInsertQuery=`INSERT INTO movies (movie_id, name, cast, language, genre) VALUES (${req.body.movie_id}, '${req.body.name}', '${req.body.cast}', '${req.body.language}','${req.body.genre}' )`;
    var theatreMovieInsertQuery=`INSERT INTO theatremovies (theatremovies_id, theatre_id, movie_id, price) VALUES (${req.body.theatreMovie_id}, ${req.body.theatre}, ${req.body.movie_id}, ${req.body.price})`;
    db.query(`SELECT movie_id from movies where name='${req.body.name}'`,(err,row)=>{
        if(err){
            res.send(JSON.stringify(err))
        }else{
            if(row.length==0){
                db.query(movieInsertQuery,(err,row)=>{
                    if(err){
                        res.send("fail at movies"+JSON.stringify(err))
                    }else{
                        db.query(theatreMovieInsertQuery,(err,row)=>{
                            if(err){
                                res.send("fail at theatre movies"+JSON.stringify(err))
                            }else{
                                res.send("success")
                            }
                        })
                    }
                })
            }else{
                theatreMovieInsertQuery=`INSERT INTO theatremovies (theatremovies_id, theatre_id, movie_id, price) VALUES (${req.body.theatreMovie_id}, ${req.body.theatre}, ${row[0].movie_id}, ${req.body.price})`;
                db.query(theatreMovieInsertQuery,(err,row)=>{
                    if(err){
                        res.send("fail at theatre movies"+JSON.stringify(err))
                    }else{
                        res.send("success")
                    }
                })
            }
        }
    })
})


module.exports=router;

