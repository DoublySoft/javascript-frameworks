import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Film} from "../../models/film";

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  @Input() film: Film;
  @Output() favorite = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  select(event, film) {
    this.favorite.emit({film: film})
  }

}
