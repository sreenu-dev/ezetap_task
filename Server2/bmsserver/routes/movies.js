var express=require('express')
var router=express.Router()
var db=require('./connection');

/**
 * Fetch Movies Related Data from DB
 */
router.get('/moviesData',(req,res)=>{
    db.query('select * from movies',(err,row)=>{
        if(err){
            res.send('Error while fetching Data'+JSON.stringify(err))
        }else{
            res.json(row);
        }
    })
})

/**
 * Fetch Theatres Related Data from DB
 */
router.get('/theatresData',(req,res)=>{
    db.query('select * from theatre',(err,row)=>{
        if(err){
            res.send(JSON.stringify(err))
        }else{
            res.json(row);
        }
    })
})

/**
 * Fetch TheaterMovies Related Data from DB
 */
router.get('/theatremoviesData',(req,res)=>{
    db.query('select * from theatremovies',(err,row)=>{
        if(err){
            res.send(JSON.stringify(err))
        }else{
            res.json(row);
        }
    })
})

/**
 * Fetch the adminData(Movies, Theatres, TheatreMoives) from DB
 */
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

/**
 * Add new Movie Details to DB
 */
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
                        res.send(JSON.stringify("success"));
                    }
                })
            }
        }
    })
})

/**
 * Add new Theatre Details to DB
 */
router.post('/saveTheatre',(req,res)=>{
    let theartreQuery=`INSERT INTO theatre (theatre_id, name, timings, location) VALUES (${req.body.theatre_id}, '${req.body.name}', '${req.body.timings}', '${req.body.location}')`
    db.query(theartreQuery,(err,row)=>{
        if(err){
            res.send(JSON.stringify(err))
        }else{
            if(req.body.movie_id!=null && req.body.movie_id!=-1 && req.body.movie_id!=undefined){
                let theaterMovieQuery=`INSERT INTO theatremovies (theatremovies_id, theatre_id, movie_id, price) VALUES (${req.body.theatreMovie_id}, ${req.body.theatre_id}, ${req.body.movie_id}, ${req.body.price})`;
                db.query(theaterMovieQuery,(err,row)=>{
                    if(err){
                        res.send(JSON.stringify(err));
                    }else{
                        res.send(JSON.stringify("success"));
                    }
                })
            }
        }
    })
})

/**
 * Update Theatre Details
 */
router.post('/updateTheatre',(req,res)=>{
    var theatreUpdateQuery=`UPDATE theatre SET name='${req.body.name}',timings='${req.body.timings}',location='${req.body.location}' WHERE theatre_id=${req.body.theatre_id}`
    var theatreMovieUpdateQuery=`UPDATE theatremovies SET theatremovies_id=${req.body.theatreMovie_id},theatre_id=${req.body.theatre_id},movie_id=${req.body.movie_id},price=${req.body.price} WHERE theatremovies_id=${req.body.theatreMovie_id}`
    db.query(theatreUpdateQuery,(err,row)=>{
        if(err){
            res.send(JSON.stringify(err))
        }else{
            db.query(theatreMovieUpdateQuery,(err,row)=>{
                if(err){
                    res.send(JSON.stringify(err))
                }else{
                    res.send(JSON.stringify("success"));
                }
            })
        }
    })
})


module.exports=router;

