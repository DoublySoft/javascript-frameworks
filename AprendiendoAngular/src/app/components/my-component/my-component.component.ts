import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {

  public title: string;
  public comment: string;
  public year: number;
  public showFilms: boolean;

  constructor() {
    this.title = 'Hola mundo, soy my component';
    this.comment = 'Este es mi primer componente';
    this.year = 2020;
    this.showFilms = true;
  }

  ngOnInit(): void {
  }

  hideFilms() {
    this.showFilms = false;
  }

}
