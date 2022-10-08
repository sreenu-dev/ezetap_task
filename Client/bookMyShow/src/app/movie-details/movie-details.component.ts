import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/movie.model';
import { TheatreMovie } from '../models/theatre-movie.model';
import { Theatre, TheatreLocation } from '../models/theatre.model';
import { MoviesService } from '../services/movies.service';
import { forkJoin } from "rxjs";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AdminData } from '../models/admindata.model';
import * as $ from 'jquery';


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
  locationData:TheatreLocation[]=[];
  selectedMovieName:string="";
  requiredTheatreIDs:number[]=[];
  selectedLocation:string="Select Location";
  selectedLocations:TheatreLocation[]=[];
  showLocationDropdown:boolean=false;
  adminData:AdminData;

  multiSelectDropdownSettings={};

  showAddTheatre:boolean=false;
  showEditTheatre:boolean=false;
  showMovieDetail:boolean=false;

  selectedTheatreId:number=-1;

  constructor(
    private moviesService: MoviesService
  ) {
    this.adminData=new AdminData();
   }

  ngOnInit(): void {
    this.loadMovieDetails();
  }
  loadMovieDetails(event:any=undefined){
    if(event=="add")
      this.selectedLocations=[];
    this.showMovieDetail=false;
    this.showLocationDropdown=false;
    this.moviesService.getAdminData().subscribe((data:AdminData)=>{
      if(data!=null){
        this.adminData=data;
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
        this.showMovieDetail=true;
        $(()=>{
          $(".modalBody")[0].click();
        })
      }
    })
  }
  closePopup(){
    this.movieDetailsEmitter.emit('close');
  }
  getLocationList(){
    let theatresFilter=this.theatreMoviesList.filter(x=>x.movie_id==this.selectedMovieId);
    theatresFilter.forEach(a=>{
      let templocation=this.theatreList.find(t=>t.theatre_id==a.theatre_id)?.location;
      if(templocation!=undefined && this.locationData.find(x=>x.item_id==templocation)==undefined){
        let locationDetail={item_id:templocation,item_text:templocation};
        this.locationList.push(templocation);
        this.locationData.push(locationDetail);
      }
    })
    this.multiSelectDropdownSettings={
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1
    }
    this.showLocationDropdown=true;
  }
  setLocation(name:string){
    this.selectedLocation=name;
    this.filteredTheatreList=this.theatreList.filter(x=>x.location==name);
  }
  getPrice(id:number){
    let price=this.theatreMoviesList.find(x=>x.movie_id==this.selectedMovieId && x.theatre_id==id)?.price;
    return (price!=undefined)?price:'Not Available';
  }
  selectLocation(event:any,type:string="none"){
    console.log(event);
    console.log(this.selectedLocations);
    let locationList:any[]=[]
    if(type=="none"){
      locationList=this.selectedLocations.map(a=>a.item_id);
    }else{
      locationList=event.map((a:any)=>a.item_id);
    }
    
    this.filteredTheatreList=this.theatreList.filter(x=>locationList.includes(x.location));
  }
  addTheatre(){
      this.showAddTheatre=true;
  }
  updateMovieDetails(event:any){
    if(event=='close'){
      this.showAddTheatre=false;
      this.showEditTheatre=false;
    }
    else if(event=='update' || event=='add'){
      this.showAddTheatre=false;
      this.showEditTheatre=false;
      this.loadMovieDetails(event);
    }
  }
  editTheatreDetails(theatre_id:number){
    this.selectedTheatreId=theatre_id;
    this.showEditTheatre=true;
  }
}
