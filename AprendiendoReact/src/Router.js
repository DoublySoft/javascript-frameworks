import React, {Component} from "react";
import {BrowserRouter, Switch} from "react-router-dom";

// Components
import SeccionPruebas from "./components/sections/SeccionPruebas";
import MiComponente from "./components/MiComponente";
import Peliculas from "./components/sections/pelicula/Peliculas";


class Router extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Router path="/" component={Peliculas} />
                    <Router path="/ruta-prueba" component={SeccionPruebas} />
                    <Router path="/segunda-ruta" component={MiComponente} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;