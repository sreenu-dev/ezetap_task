import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddTheatreData } from '../models/add-theatre.model';
import { AdminData } from '../models/admindata.model';
import { Movie } from '../models/movie.model';
import { TheatreMovie } from '../models/theatre-movie.model';
import { Theatre } from '../models/theatre.model';
import { MoviesService } from '../services/movies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-theatre',
  templateUrl: './edit-theatre.component.html',
  styleUrls: ['./edit-theatre.component.css']
})
export class EditTheatreComponent implements OnInit {

  @Input() adminData:AdminData;
  @Input() selectedMovieId:number=-1;
  @Input() selectedTheatreId:number=-1;
  selectedMovieName:string='';
  moviesData:Movie[]=[]
  theatresData:Theatre[]=[]
  theatreMovieData:TheatreMovie[]=[];
  updateName:string='';
  updateLocation:string='';
  updateTimings:string='';
  updatePrice:number=-1;

  showEditForm:boolean=false;
  
  @Output() updateTheatreEmitter:EventEmitter<any>=new EventEmitter();

  theatreForm:FormGroup=new FormGroup({
    'name':new FormControl(null,[Validators.required]),
    'location':new FormControl(null,[Validators.required]),
    'timings':new FormControl(null,[Validators.required]),
    'price':new FormControl(null,[Validators.required])
  });
  constructor(
    private moviesService:MoviesService,
    private toaster:ToastrService
  ) {
    this.adminData=new AdminData();
   }

  ngOnInit(): void {
    this.moviesData=this.adminData.movies;
    let movieName=this.moviesData.find(x=>x.movie_id==this.selectedMovieId)?.name;
    this.selectedMovieName=movieName!=undefined?movieName:'';
    let theatreDetails=this.adminData.theatres.find(x=>x.theatre_id==this.selectedTheatreId);
    let name=theatreDetails?.name;
    let location=theatreDetails?.location;
    let timings=theatreDetails?.timings;
    let price=this.adminData.theatreMovies.find(x=>x.movie_id==this.selectedMovieId && x.theatre_id==this.selectedTheatreId)?.price;
    this.theatreForm.controls['name'].setValue(name!=undefined?name:'');
    this.theatreForm.controls['location'].setValue(location!=undefined?location:'');
    this.theatreForm.controls['timings'].setValue(timings!=undefined?timings:'');
    this.theatreForm.controls['price'].setValue(price!=undefined?price:-1);
    this.showEditForm=true;
  }
  updateTheatre(){
    if(this.theatreForm.valid){
      let theatreAddData:AddTheatreData=new AddTheatreData();
      theatreAddData.movie_id=this.selectedMovieId;
      theatreAddData.name=this.theatreForm.controls['name'].value;
      theatreAddData.location=this.theatreForm.controls['location'].value;
      theatreAddData.timings=this.theatreForm.controls['timings'].value;
      theatreAddData.price=this.theatreForm.controls['price'].value;
      theatreAddData.theatre_id=this.selectedTheatreId;
      let theatreMovieId=this.adminData.theatreMovies.find(x=>x.movie_id==this.selectedMovieId && x.theatre_id==this.selectedTheatreId)?.theatremovies_id;
      theatreAddData.theatreMovie_id=theatreMovieId!=undefined?theatreMovieId:-1;
      this.moviesService.updateTheatre(theatreAddData).subscribe((data:any)=>{
        console.log(data);
        if(data=='success'){
          this.toaster.success("Theatre Details Updated Successfully")
          this.closePopup();
        }else{
          this.toaster.error("Failed to update theatre Details")
        }
      })
    }
  }
  closePopup(){
    this.updateTheatreEmitter.emit("add");
  }
}
