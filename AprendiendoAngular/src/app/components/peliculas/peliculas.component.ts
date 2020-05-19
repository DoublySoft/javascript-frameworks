import {Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import {Film} from "../../models/film";
import {PeliculaService} from "../../services/pelicula.service";

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  public title: string;
  public films: Film[];
  public favorite: Film;
  public date: any;

  constructor(private _peliculaService: PeliculaService) {
    this.title = 'Componente películas';
    this.films = this._peliculaService.getFilms();
    this.date = new Date(2020, 9, 12);
  }

  ngOnInit(): void {
    console.log(this.films);
    console.log('Componente iniciado.');
    console.log(this._peliculaService.holaMundo());
  }

  ngDoCheck() {
    console.log('DoCheck lanzado.');
  }

  changeTitle() {
    this.title = 'El titulo ha cambiado';
  }

  ngOnDestroy() {
    console.log('El componente se va a eliminar.');
  }

  checkFavorite(event) {
    this.favorite = event.film;
  }

}
