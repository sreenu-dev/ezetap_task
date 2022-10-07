import { Movie } from "./movie.model";
import { TheatreMovie } from "./theatre-movie.model";
import { Theatre } from "./theatre.model";

export class AdminData{
    movies:Movie[]=[];
    theatres:Theatre[]=[];
    theatreMovies:TheatreMovie[]=[];
}