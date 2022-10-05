import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'movies',component:MoviesComponent},
  {path:'**',component:LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
