import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private httpClient:HttpClient
  ) { }
  getMovieDetails():any{
    return this.httpClient.get(environment.moviesRoute);
  }
  getTheatreDetails():any{
    return this.httpClient.get(environment.theatresRoute);
  }
  getTheatreMoviesDetails():any{
    return this.httpClient.get(environment.theatreMoviesRoute);
  }
  getAdminData():any{
    return this.httpClient.get(environment.adminDataRoute);
  }
  saveMovie(data:any):Observable<any>{
    return this.httpClient.post(environment.saveMovieRoute,data);
  }
}
