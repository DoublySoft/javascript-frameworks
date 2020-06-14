import React, {Component} from "react";
import Slider from "../slider/Slider";
import Sidebar from "../sidebar/Sidebar";
import Articles from "./article/Articles";

class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <Slider
                    title="Bienvenido al Curso de React con Víctor Robles de victorroblesweb.es"
                    btn="Ir al Blog"
                    size="slider-big"/>

                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Últimos artículos</h1>
                        <Articles
                            home="true"/>
                    </div>

                    <Sidebar/>

                    <div className="clearfix"/>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
