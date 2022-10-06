import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/movie.model';
import { TheatreMovie } from '../models/theatre-movie.model';
import { Theatre } from '../models/theatre.model';
import { MoviesService } from '../services/movies.service';
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  @Input() selectedMovieId:number=-1;
 
  @Output() movieDetailsEmitter: EventEmitter<any>=new EventEmitter();

  moviesList:Movie[]=[];
  theatreMoviesList:TheatreMovie[]=[];
  theatreList:Theatre[]=[];
  theatreListCopy:Theatre[]=[];
  filteredTheatreList:Theatre[]=[];
  locationList:string[]=[];
  selectedMovieName:string="";
  requiredTheatreIDs:number[]=[];
  selectedLocation:string="Select Location";
  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.moviesService.getAdminData().subscribe((data:any)=>{
      if(data!=null){
        this.moviesList=data.movies
        let movieName=this.moviesList.find(x=>x.movie_id==this.selectedMovieId)?.name;
        this.selectedMovieName=(movieName!=undefined)?movieName:'';

        this.theatreList=data.theatres
        this.theatreListCopy=JSON.parse(JSON.stringify(this.theatreList));
        

        this.theatreMoviesList=data.theatreMovies
        this.theatreMoviesList.filter(x=>x.movie_id==this.selectedMovieId).forEach(a=>{
          this.requiredTheatreIDs.push(a.theatre_id);
        })
        
        this.getLocationList();
        this.theatreList=this.theatreList.filter(x=>this.requiredTheatreIDs.includes(x.theatre_id));
      }
    })
    // this.moviesService.getMovieDetails().subscribe((data:any)=>{
    //   if(data!=null && data.length!=0){
    //     this.moviesList=data;
    //     let movieName=this.moviesList.find(x=>x.movie_id==this.selectedMovieId)?.name;
    //     this.selectedMovieName=(movieName!=undefined)?movieName:'';
    //   }
    // })
    // this.moviesService.getTheatreMoviesDetails().subscribe((data:any)=>{
    //   if(data!=null && data.length!=0){
    //     this.theatreMoviesList=data;
    //   }
    // })
    // this.moviesService.getTheatreDetails().subscribe((data:any)=>{
    //   if(data!=null && data.length!=0){
    //     this.theatreList=data;
    //   }
    // })
    // setTimeout(()=>{
    //   this.getLocationList();
    // },1000)
  }
  closePopup(){
    this.movieDetailsEmitter.emit('closed');
  }
  getLocationList(){
    let theatresFilter=this.theatreMoviesList.filter(x=>x.movie_id==this.selectedMovieId);
    theatresFilter.forEach(a=>{
      let templocation=this.theatreList.find(t=>t.theatre_id==a.theatre_id)?.location;
      if(templocation!=undefined){
        this.locationList.push(templocation);
      }
    })
  }
  setLocation(name:string){
    this.selectedLocation=name;
    this.filteredTheatreList=this.theatreList.filter(x=>x.location==name);
  }
  getPrice(id:number){
    let price=this.theatreMoviesList.find(x=>x.movie_id==this.selectedMovieId && x.theatre_id==id)?.price;
    return (price!=undefined)?price:'Not Available';
  }
}
