import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../models/article";
import {Global} from './global';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  pruebas() {
    return 'Soy el servicio de artículos';
  }

  getArticles(last: any = null): Observable<any> {

    let articles = 'articles';

    if (last != null) {
      articles = 'articles/true';
    }

    return this._http.get(this.url + articles);
  }

  getArticle(id): Observable<any> {
    return this._http.get(this.url + 'article/' + id)
  }

  search(search): Observable<any> {
    return this._http.get(this.url + 'search/' + search)
  }

  createArticle(article): Observable<any> {
    let params = JSON.stringify(article);
    let headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.post(this.url + 'create-article', params, {headers: headers});
  }

}
