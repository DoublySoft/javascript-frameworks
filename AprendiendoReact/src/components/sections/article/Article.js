import React, {Component} from "react";
import axios from "axios";
import Global from "../../../Global";
import Moment from "react-moment";
import "moment/locale/es";

class Article extends Component {

    url = Global.urlApi;
    state = {
        articles: [],
        status: null
    };

    componentWillMount() {
        this.getArticles();
    }

    getArticles = () => {
        console.log(this.url)
        axios.get(this.url + "articles")
            .then(res => {
                return (
                    this.setState({
                        articles: res.data.articles,
                        status: 'success'
                    })
                )
            });
    }

    render() {

        if (this.state.articles.length >= 1) {

            let listArticles = this.state.articles.map((article) => {
                return (
                    <article className="article-item article-detail">
                        <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img
                                        src={this.url + 'get-file/' + article.image}
                                        alt={article.title}/>
                                ) : (
                                    <img
                                        src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8"
                                        alt={article.title}/>
                                )
                            }
                        </div>

                        <h1 className="subheader">{article.title}</h1>
                        <span className="date">
                            <Moment locale="es" fromNow>{article.date}</Moment>
                        </span>
                        <p>{article.content}</p>

                        <div className="clearfix"/>
                    </article>
                )
            })

            return (
                <div id="articles">
                    {listArticles}
                </div>
            )
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay artículos para mostrar</h2>
                    <p>Todavía no hay contenido en esta sección</p>
                </div>
            )
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras carga el contenido</p>
                </div>
            )
        }
    }
}

export default Article;
