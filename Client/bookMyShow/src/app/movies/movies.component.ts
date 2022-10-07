import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../models/movie.model';
import { TheatreMovie } from '../models/theatre-movie.model';
import { Theatre } from '../models/theatre.model';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private router:Router
  ) { }
  selectedMovieId:number=-1;
  showMovieDetailsComponent=false;
  showAddMovie:boolean=false;
  moviesList:Movie[]=[];
  theatreMoviesList:TheatreMovie[]=[];
  theatreList:Theatre[]=[];
  ngOnInit(): void {
   this.loadMoviesList(); 
  }
  loadMoviesList(){
    this.moviesService.getAdminData().subscribe((data:any)=>{
      if(data!=null){
        this.moviesList=data.movies

        this.theatreList=data.theatres

        this.theatreMoviesList=data.theatreMovies
      }
    })
  }
  getLocationCount(movieID:number){
    let theatresNames=this.theatreMoviesList.filter(x=>x.movie_id==movieID);
    // let out=[];
    // for (const tm of theatresNames) {
    //   out.push(this.theatreList.find(x=>x.theatre_id==tm.theatre_id)?.name);
    // }
    return theatresNames.length;
  }

  showMovieDetails(movieID:number){
    if(!this.showMovieDetailsComponent && !this.showAddMovie){
      this.selectedMovieId=movieID;
      this.showMovieDetailsComponent=true;
    }
  }
  movieDetailsClose(event:any){
    console.log(event);
    this.selectedMovieId=-1;
    this.showMovieDetailsComponent=false;
    this.showAddMovie=false;
    this.loadMoviesList();
  }
  addMovie(){
    this.showAddMovie=true;
  }

}
