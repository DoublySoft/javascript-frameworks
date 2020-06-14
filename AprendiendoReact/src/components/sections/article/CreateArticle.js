import React, {Component} from "react";
import axios from "axios";
import Sidebar from "../../sidebar/Sidebar";
import {Redirect} from "react-router-dom";
import Global from "../../../Global";

class CreateArticle extends Component {

    url = Global.urlApi;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null
    }

    saveArticle = (e) => {
        e.preventDefault();

        this.changeState();

        // Save article with http
        axios.post(this.url + 'create-article', this.state.article)
            .then(res => {
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: 'success'
                    });
                } else {
                    this.setState({
                        status: 'failed'
                    });
                    console.log('No se guardó');
                }
            });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        })
    }

    render() {

        if (this.state.status === 'success') {
            return <Redirect to={'/blog'}/>;
        }

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">{}</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="articleTitle">Título</label>
                            <input type="text" name="tilte" id="articleTitle" ref={this.titleRef}
                                   onChange={this.changeState} required/>
                            <small>El título no es válido.</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="articleContent">Contenido</label>
                            <textarea name="content" id=" articleContent" ref={this.contentRef}
                                      onChange={this.changeState} required/>
                            <small>El contenido no es válido.</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="articleImage">Imagen</label>
                            <input type="file" name="image" id="articleImage" required/>
                        </div>

                        <div className="clearfix"/>

                        <input type="submit" value="Guardar" className="btn btn-success"/>
                    </form>

                </section>

                <Sidebar
                    blog=" true"/>

                <div className=" clearfix"/>
            </div>
        )
    }
}

export default CreateArticle;
