// Importar los módulos del router de angular
import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

// Importar componentes a los cuales les quiero hacer una pagina exclusiva
import {HomeComponent} from "./components/home/home.component";
import {BlogComponent} from "./components/blog/blog.component";
import {FormularioComponent} from "./components/formulario/formulario.component";
import {PeliculasComponent} from "./components/peliculas/peliculas.component";
import {PaginaComponent} from "./components/pagina/pagina.component";
import {ErrorComponent} from "./components/error/error.component";
import {ArticleComponent} from "./components/article/article.component";
import {SearchComponent} from "./components/search/search.component";
import {CreateArticleComponent} from "./components/create-article/create-article.component";

// Array de rutas
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog/articulo/:id', component: ArticleComponent},
  {path: 'blog/crear-articulo', component: CreateArticleComponent},
  {path: 'buscar/:search', component: SearchComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'peliculas', component: PeliculasComponent},
  {path: 'pagina-de-pruebas', component: PaginaComponent},
  {path: 'pagina-de-pruebas/:name/:surname', component: PaginaComponent},
  {path: '**', component: ErrorComponent}
]

// Exportar el módulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
