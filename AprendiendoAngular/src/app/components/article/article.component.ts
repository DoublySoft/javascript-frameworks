import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {Article} from '../../models/article';
import {ActivatedRoute, Router} from '@angular/router';
import {Global} from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public url: string;

  constructor(
    public _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
        response => {
          if (response.article) {
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
            console.log('A la Home!!!');
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  delete(id) {
    swal({
      title: '¿Estás seguro?',
      text: 'Una vez borrado no podrás recuperarlo!',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._articleService.delete(id).subscribe(
            response => {
              this._router.navigate(['/blog']);
              swal('Plof! Tu artículo fué eliminado!', {
                icon: 'success',
              });
            },
            error => {
              console.log(error);
              this._router.navigate(['/blog']);
            }
          );
        } else {
          swal('Tu artículo sigue a salvo!');
        }
      });
  }
}
