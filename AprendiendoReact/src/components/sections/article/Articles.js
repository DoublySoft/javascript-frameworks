import React, {Component} from "react";
import axios from "axios";
import Global from "../../../Global";
import Moment from "react-moment";
import "moment/locale/es";
import {Link} from "react-router-dom";

class Articles extends Component {

    url = Global.urlApi;
    state = {
        articles: [],
        status: null
    };

    constructor(props) {
        super(props);

        let home = this.props.home;
        let search = this.props.search;

        if (home === 'true') {
            this.getLastArticles();
        } else if (search) {
            this.getSearchArticles(search);
        } else {
            this.getArticles();
        }
    }

    getArticles = () => {
        console.log(this.url)
        axios.get(this.url + "articles")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            });
    }

    getLastArticles = () => {
        console.log(this.url)
        axios.get(this.url + "articles/last")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            })
            .catch(err => {
                this.setState({
                    articles: [],
                    status: 'success'
                });
            });
    }

    getSearchArticles = (search) => {
        axios.get(this.url + "search/" + search)
            .then(res => {
                if (res.data.articles) {
                    this.setState({
                        articles: res.data.articles,
                        status: 'success'
                    });
                } else {
                    this.setState({
                        articles: res.data.articles,
                        status: 'failed'
                    });
                }
            });
    }

    render() {

        if (this.state.articles.length >= 1) {

            let listArticles = this.state.articles.map((article) => {
                return (
                    <article key={article._id} className="article-item" id="article-template">
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

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment locale="es" fromNow>{article.date}</Moment>
                        </span>
                        <Link to={'/blog/articulo/' + article._id}>Leer más</Link>

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
                    <p>No hay artículos para mostrar</p>
                </div>
            )
        } else {
            return (
                <div id="articles">
                    <p>Cargando...</p>
                </div>
            )
        }
    }
}

export default Articles;
