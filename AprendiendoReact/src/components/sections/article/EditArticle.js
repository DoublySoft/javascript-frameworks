import React, {Component} from "react";
import axios from "axios";
import Sidebar from "../../sidebar/Sidebar";
import {Redirect} from "react-router-dom";
import Global from "../../../Global";
import SimpleReactValidator from "simple-react-validator";
import swal from 'sweetalert';

class EditArticle extends Component {

    url = Global.urlApi;

    articleId = null;

    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator(Global.messageValidator);
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            })
    }

    saveArticle = (e) => {
        e.preventDefault();

        this.changeState();

        if (this.validator.allValid()) {

            // Save article with http
            axios.put(this.url + 'article' + this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Articulo actualizado',
                            'El artículo ha sido actualizado correctamente',
                            'success'
                        )

                        // Subir fichero
                        if (this.state.selectedFile !== null) {
                            let articleId = this.state.article._id;
                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            axios.post(this.url + 'upload-file/' + articleId, formData)
                                .then(res => {
                                        if (res.data.article) {
                                            this.setState({
                                                article: res.data.article,
                                                status: 'success'
                                            });
                                        } else {
                                            this.setState({
                                                article: res.data.article,
                                                status: 'failed'
                                            });
                                        }
                                    }
                                )
                        } else {
                            this.setState({
                                status: 'failed'
                            });
                        }

                    } else {
                        this.setState({
                            status: 'failed'
                        });
                        console.log('No se guardó');
                    }
                });

        } else {

            this.setState({
                status: 'failed'
            });

            this.validator.showMessages();
            this.forceUpdate();
        }


    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        })

        this.validator.showMessages();
        this.forceUpdate();
    }

    changeFile = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    render() {

        if (this.state.status === 'success') {
            return <Redirect to={'/blog'}/>;
        }

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar artículo</h1>

                    {
                        this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="articleTitle">Título</label>
                                <input type="text" name="title" id="articleTitle"
                                       defaultValue={this.state.article.title} ref={this.titleRef}
                                       onChange={this.changeState}/>
                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="articleContent">Contenido</label>
                                <textarea name="content" id=" articleContent" defaultValue={this.state.article.content}
                                          ref={this.contentRef}
                                          onChange={this.changeState}/>
                                {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}
                            </div>



                            <div className="form-group">
                                <label htmlFor="articleImage">Imagen</label>
                                <div className="image-wrap">
                                    {
                                        this.state.article.image !== null ? (
                                            <img
                                                src={this.url + 'get-file/' + this.state.article.image}
                                                alt={this.state.article.title}/>
                                        ) : (
                                            <img
                                                src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8"
                                                alt={this.state.article.title}/>
                                        )
                                    }
                                </div>
                                <input type="file" name="file0" id="articleImage" onChange={this.changeFile}/>
                            </div>

                            <div className="clearfix"/>

                            <input type="submit" value="Guardar" className="btn btn-success"/>
                        </form>
                    }

                    {
                        !this.state.article.title &&
                        <h1 className="subheader">Cargando...</h1>
                    }

                </section>

                <Sidebar
                    blog=" true"/>

                <div className=" clearfix"/>
            </div>
        )
    }
}

export default EditArticle;
