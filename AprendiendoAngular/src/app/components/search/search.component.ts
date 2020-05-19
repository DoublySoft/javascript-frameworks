import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/article";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService]
})
export class SearchComponent implements OnInit {

  public articles: Article[];
  public search: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.search = params['search'];

      this._articleService.search(this.search).subscribe(
        response => {
          if (response.articles) {
            this.articles = response.articles;
          }
          console.log(this.articles);
        },
        error => {
          console.log(error);
          this._router.navigate(['/home']);
        }
      )
    });
  }

}
