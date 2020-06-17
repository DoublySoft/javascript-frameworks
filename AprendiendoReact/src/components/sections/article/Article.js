import React, {Component} from "react";
import axios from "axios";
import Global from "../../../Global";
import {Link, Redirect} from "react-router-dom";
import Moment from "react-moment";
import Sidebar from "../../sidebar/Sidebar";
import swal from "sweetalert";

class Article extends Component {

    url = Global.urlApi;

    state = {
        article: {},
        status: null
    }

    constructor(props) {
        super(props);

        this.getArticle();
    }

    getArticle = () => {
        let id = this.props.match.params.id

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                })
            })
            .catch(err => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            });
    }

    actualizeArticle = (id) => {

    }

    deleteArticle = (id) => {
        swal({
            title: 'Borrando artículo',
            text: '¿Estás seguro de que quieres eliminar el artículo?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal("Poof! Tu artículo fue borrado!", {
                    icon: "success",
                });

                axios.delete(this.url + 'article/' + id)
                    .then(res => {
                        this.setState({
                            article: res.data.article,
                            status: 'deleted'
                        });
                    });
            } else {
                swal("Tu artículo está a salvo!", {
                    icon: "success",
                });
            }
        });
    }

    render() {

        if (this.state.status === 'deleted') {
            return <Redirect to={'/blog'}/>;
        }

        let article = this.state.article

        return (
            <div className="center">
                <section id="content">
                    {
                        this.state.article &&
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
                            <span className="date"><Moment locale="es" fromNow>{article.date}</Moment></span>
                            <p>{article.content}</p>

                            <Link to={'/blog/editar-articulo/' + article._id} className="btn btn-warning">Editar</Link>
                            <button onClick={
                                () => {
                                    this.deleteArticle(article._id);
                                }
                            } className="btn btn-danger">Eliminar
                            </button>

                            <div className="clearfix"/>
                        </article>
                    }

                    {
                        !this.state.article &&
                        <div className="article">
                            <h2 className="subheader">El artículo no existe</h2>
                            <p>Inténtalo de nuevo más tarde</p>
                        </div>
                    }

                    {
                        this.state.status == null &&
                        <div className="article">
                            <h2 className="subheader">Buscando el artículo</h2>
                            <p>Cargando...</p>
                        </div>
                    }
                </section>

                <Sidebar
                    blog="true"/>

                <div className="clearfix"/>
            </div>
        )
    }
}

export default Article;
