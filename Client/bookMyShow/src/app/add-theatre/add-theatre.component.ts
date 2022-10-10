import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddTheatreData } from '../models/add-theatre.model';
import { AdminData } from '../models/admindata.model';
import { MoviesService } from '../services/movies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent implements OnInit {

  @Input() selectedMovieId:number=-1;
  @Input() selectedMovieName:string='';
  @Input() adminData:AdminData;

  @Output() addTheatreEmitter:EventEmitter<any>=new EventEmitter();

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
  }
  closePopup(){
    this.addTheatreEmitter.emit("close");
  }
  saveTheatre(){
    if(this.theatreForm.valid){
      let theatreAddData:AddTheatreData=new AddTheatreData();
      theatreAddData.movie_id=this.selectedMovieId;
      theatreAddData.name=this.theatreForm.controls['name'].value;
      theatreAddData.location=this.theatreForm.controls['location'].value;
      theatreAddData.timings=this.theatreForm.controls['timings'].value;
      theatreAddData.price=this.theatreForm.controls['price'].value;
      theatreAddData.theatre_id=this.adminData.theatres.length+1;
      theatreAddData.theatreMovie_id=this.adminData.theatreMovies.length+1;
      if(this.adminData.theatres.find(x=>x.name==theatreAddData.name)==undefined){
        this.moviesService.saveTheatre(theatreAddData).subscribe((data:any)=>{
          if(data=='success'){
            this.toaster.success("Theater Added Successfully");
            this.addTheatreEmitter.emit("add");
          }else{
            this.toaster.error("Failed to Add Theatre")
          }
        })
      }else{
        this.toaster.error("Theatre Already Exist!!")
      }
    }else{
      this.toaster.warning("Please enter all the details");
    }
  }
}
