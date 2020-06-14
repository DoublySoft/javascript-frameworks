import React, {Component} from "react";
import {Link} from "react-router-dom";

class Pelicula extends Component {

    marcar = () => {
        this.props.marcarFavorita(this.props.pelicula, this.props.indice);
    }

    render() {
        const pelicula = this.props.pelicula;
        const {title, image} = pelicula;

        return (
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img
                        src={image}
                        alt={title}/>
                </div>

                <h2>{title}</h2>
                <span className="date">Hace 5 minutos</span>
                <Link to={'#'}>Leer más</Link>
                <button onClick={this.marcar}>Favorita</button>

                <div className="clearfix"/>
            </article>
        );
    }
}

export default Pelicula;