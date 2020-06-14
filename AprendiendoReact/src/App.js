import React from 'react';
import './assets/css/App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Components
import Error from "./components/Error";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/sections/Home";
import Blog from "./components/sections/Blog";
import Peliculas from "./components/sections/pelicula/Peliculas";
import Formulario from "./components/Formulario";
import Article from "./components/sections/article/Article";
import Search from "./components/Search";

function App() {

    return (
        <Router className="App">
            <Header/>

            <Switch>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/blog" component={Blog}/>
                <Route exact path="/blog/articulo/:id" component={Article}/>
                <Route exact path="/blog/busqueda/:search" component={Search}/>
                <Route exact path="/formulario" component={Formulario}/>
                <Route exact path="/peliculas" render={Peliculas}/>
                <Route exact path="/pruebas/:nombre/:apellidos?" render={(props) => {
                    let nombre = props.match.params.nombre;
                    let apellidos = props.match.params.apellidos;

                    return (
                        <div id="content">
                            <h1 className="subheader">Página de prueba</h1>
                            <h2>
                                {nombre && !apellidos &&
                                <span>{nombre}</span>
                                }
                                {nombre && apellidos &&
                                <span>{nombre} {apellidos}</span>
                                }
                            </h2>
                        </div>
                    )
                }}/>

                <Route component={Error}/>
            </Switch>

            <Footer/>

        </Router>
    );
}

export default App;
