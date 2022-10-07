import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Theatre } from '../models/theatre.model';
import { MoviesService } from '../services/movies.service';
import { AddMovieData } from "../models/add-movie.model";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  theatreList:Theatre[]=[];
  selectedTheatre:string="Select Theatre";
  selectedTheaterId:number=-1;
  moviesLength:number=-1;
  theatresLength:number=-1;
  theatreMoviesLength:number=-1;

  @Output() addMovieEmitter:EventEmitter<any>=new EventEmitter();
  constructor(
    private moviesService: MoviesService
  ) { }
  moviesForm:FormGroup=new FormGroup({
    'name':new FormControl(null,[Validators.required]),
    'cast':new FormControl(null,[Validators.required]),
    'language':new FormControl(null,[Validators.required]),
    'genre':new FormControl(null,[Validators.required])
  });

  ngOnInit(): void {
    this.moviesService.getAdminData().subscribe((data:any)=>{
      if(data!=null && data.length!=0){
        this.theatreList=data.theatres;
        this.moviesLength=data.movies.length;
        this.theatresLength=data.theatres.length;
        this.theatreMoviesLength=data.theatreMovies.length;
      }
    })
  }
  addMovie(){
    if(this.moviesForm.valid){
      let newMovieData:AddMovieData=new AddMovieData();
      newMovieData.movie_id=this.moviesLength+1;
      newMovieData.name=this.moviesForm.controls['name'].value;
      newMovieData.cast=this.moviesForm.controls['cast'].value;
      newMovieData.language=this.moviesForm.controls['language'].value;
      newMovieData.genre=this.moviesForm.controls['genre'].value;
      this.moviesService.saveMovie(newMovieData).subscribe((data:any)=>{
        console.log(data);
        this.closePopup();
      })
      
    }
  }
  selectTheatre(id:any,name:string){
    console.log(name)
    this.selectedTheatre=name;
    this.selectedTheaterId=id;
  }
  closePopup(){
    this.addMovieEmitter.emit("close");
  }
}
