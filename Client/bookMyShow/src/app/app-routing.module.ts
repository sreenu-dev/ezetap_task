import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'movies',component:MoviesComponent},
  // {path:'addMovie',component:AddMovieComponent},
  {path:'**',component:LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false,useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
