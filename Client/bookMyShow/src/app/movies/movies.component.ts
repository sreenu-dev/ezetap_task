import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  movieListCopy:Movie[]=[];
  theatreMoviesList:TheatreMovie[]=[];
  theatreList:Theatre[]=[];

  filterReload:number=100;

  multiSelectDropdownSettings:IDropdownSettings={
    singleSelection: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1
  }
  languageDropdownList:any[]=[]
  genreDropdownList:any[]=[];
  selectedLanguageDropdown:any[]=[]
  selectedGenreDropdown:any[]=[];

  showLanguageFilter:boolean=false;
  showGenreFilter:boolean=false;

  //Sorting
  currentSort:string='';
  nameSortOrder:string='desc';
  langSortOrder:string='desc';
  emptyData:boolean=false;
  ngOnInit(): void {
   this.loadMoviesList(); 
  }
  loadMoviesList(){
    this.moviesList=[];
    this.moviesService.getAdminData().subscribe((data:any)=>{
      if(data!=null){
        this.moviesList=data.movies
        if(this.moviesList.length==0){
          this.emptyData=true;
        }
        this.movieListCopy=JSON.parse(JSON.stringify(this.moviesList))

        this.theatreList=data.theatres

        this.theatreMoviesList=data.theatreMovies
        this.getLanguageList(this.moviesList);
        this.getGenreList(this.moviesList);
      }
    })
  }
  getLanguageList(moviesList:Movie[]){
    this.languageDropdownList=[];
    for(let movie of moviesList){
      if(!this.languageDropdownList.includes(movie.language)){
        this.languageDropdownList.push(movie.language);
      }
    }
    this.selectedLanguageDropdown=JSON.parse(JSON.stringify(this.languageDropdownList));
    this.showLanguageFilter=true;
  }
  getGenreList(movieList:Movie[]){
    this.genreDropdownList=[];
    for(let movie of movieList){
      if(!this.genreDropdownList.includes(movie.genre)){
        this.genreDropdownList.push(movie.genre);
      }
    }
    this.selectedGenreDropdown=JSON.parse(JSON.stringify(this.genreDropdownList));
    this.showGenreFilter=true;
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
    if(event=='close'){
      this.selectedMovieId=-1;
      this.showMovieDetailsComponent=false;
      this.showAddMovie=false;
    }else if(event=='update'){
      this.selectedMovieId=-1;
      this.showMovieDetailsComponent=false;
      this.showAddMovie=false;
      this.loadMoviesList();
    }
    
  }
  addMovie(){
    this.showAddMovie=true;
  }
  languageFilter(event:any,type:string='none'){
    this.showGenreFilter=false;
    console.log(this.selectedLanguageDropdown)
    if(type=='none'){
      this.moviesList=this.moviesList.filter(x=> this.selectedLanguageDropdown.includes(x.language));
    }else if(type=='select'){
      this.moviesList=this.movieListCopy.filter(x=> this.selectedLanguageDropdown.includes(x.language));
    }else{
      this.moviesList=this.movieListCopy.filter(x=>event.includes(x.language))
    }
    setTimeout(()=>{
      this.getGenreList(this.moviesList);
    },this.filterReload)
  }
  genreFilter(event:any,type:string='none'){
    this.showLanguageFilter=false;
    if(type=='none'){
      this.moviesList=this.moviesList.filter(x=>this.selectedGenreDropdown.includes(x.genre));
    }
    else if(type=='select'){
      this.moviesList=this.movieListCopy.filter(x=> this.selectedGenreDropdown.includes(x.genre));
    }
    else{
      this.moviesList=this.movieListCopy.filter(x=>event.includes(x.genre));
    }
    setTimeout(()=>{
      this.getLanguageList(this.moviesList);
    },this.filterReload)
  }
  clearFilter(){
    this.showLanguageFilter=false;
    this.showGenreFilter=false;
    this.moviesList=JSON.parse(JSON.stringify(this.movieListCopy));
    setTimeout(()=>{
      this.getGenreList(this.moviesList);
      this.getLanguageList(this.moviesList)
    },this.filterReload)
  }
  sortName(){
    this.currentSort='name'
    this.langSortOrder='desc'
    if(this.nameSortOrder=='asc'){
      this.moviesList.sort((a,b)=>a.name.localeCompare(b.name))
    }else{
      this.moviesList.sort((a,b)=>b.name.localeCompare(a.name))
    }
    this.nameSortOrder=this.nameSortOrder=='asc'?'desc':'asc';
  }
  sortLang(){
    this.currentSort='lang'
    this.nameSortOrder='desc'
    if(this.langSortOrder=='asc'){
      this.moviesList.sort((a,b)=>a.language.localeCompare(b.language))
    }else{
      this.moviesList.sort((a,b)=>b.language.localeCompare(a.language))
    }
    this.langSortOrder=this.langSortOrder=='asc'?'desc':'asc';
  }
}
