import React, {Component} from "react";
import Pelicula from "./Pelicula";
import Sidebar from "../../sidebar/Sidebar";
import Slider from "../../slider/Slider";

class Peliculas extends Component {

    state = {};

    cambiarTitulo = () => {
        let {peliculas} = this.state;
        let random = Math.floor(Math.random() * 3);
        peliculas[random].title = "Batman Begins";

        this.setState({
            peliculas: peliculas
        })
    }

    favorita = (pelicula, indice) => {
        this.setState({
            favorita: pelicula
        })
    }

    componentWillMount() {
        this.setState({
            favorita: {},
            peliculas: [
                {title: "Batman vs Superman", image: "https://www.comicverso.com/wp-content/uploads/2019/12/destacada-batmanvssuperman.jpg"},
                {title: "Gran Torino", image: "https://pics.filmaffinity.com/Gran_Torino-111185177-large.jpg"},
                {title: "Looper", image: "https://images-na.ssl-images-amazon.com/images/I/71YHgMctCEL._SL1000_.jpg"}
            ]
        });
    }

    render() {
        let pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        }

        let favorita;
        if (this.state.favorita.title) {
            favorita = (
                <p className="favorita" style={pStyle}>
                    <stron>La película favorita es:</stron>
                    <span>{this.state.favorita.title}</span>
                </p>
            );
        } else {
            favorita = <p>No hay ninguna película favorita</p>;
        }

        return (
            <React.Fragment>
                <Slider
                    title="Formularo de contacto"
                    size="slider-small"/>

                <div className="center">
                    <div id="content">
                        <h2 className="subheader">Películas</h2>
                        <p>Selección de películas favoritas de {this.state.nombre}</p>
                        <p>
                            <button onClick={this.cambiarTitulo}>Cambia títulos</button>
                        </p>

                        {favorita}

                        <div id="articles">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFavorita={this.favorita}/>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <Sidebar
                        blog="true"/>

                    <div className="clearfix"/>
                </div>
            </React.Fragment>
        );
    }
}

export default Peliculas;
