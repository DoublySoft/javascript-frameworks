import {Injectable} from '@angular/core';
import {Film} from "../models/film";


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  public films: Film[];

  constructor() {
    this.films = [
      new Film('Spiderman 4', 2019, 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2013/03/213474-sam-raimi-explica-cancelacion-spiderman-4.jpg?itok=ZjuIXQVq'),
      new Film('Los vengadores EndGame', 2016, 'https://img-cdn.hipertextual.com/files/2019/07/hipertextual-ver-avengers-endgame-4k-2019810743.jpeg?strip=all&lossy=1&quality=70&ssl=1'),
      new Film('Batman vs Superman', 2014, 'https://staticuestudio.blob.core.windows.net/buhomag/2016/03/24171527/img_gtosas_20160211-185846_imagenes_lv_otras_fuentes_bvs_faceoff_wpw-kQJC-U302090764026trH-992x558@LaVanguardia-Web.jpg'),
      new Film('Batman vs Superman 2', 2018, 'https://staticuestudio.blob.core.windows.net/buhomag/2016/03/24171527/img_gtosas_20160211-185846_imagenes_lv_otras_fuentes_bvs_faceoff_wpw-kQJC-U302090764026trH-992x558@LaVanguardia-Web.jpg')
    ];
  }

  holaMundo() {
    return 'Hola Mundo desde un servicio de Angular.';
  }

  getFilms() {
    return this.films;
  }
}
