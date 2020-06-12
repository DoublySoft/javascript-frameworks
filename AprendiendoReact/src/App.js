import React from 'react';
import './assets/css/App.css';

// Components
import Header from "./components/header/Header";
import Slider from "./components/slider/Slider";
import Sidebar from "./components/sidebar/Sidebar";
import Footer from "./components/footer/Footer";
import Router from "./Router";

function App() {

    let slideString = "Bienvenido al Curso de React con Víctor Robles de victorroblesweb.es";
    let buttonString = "Ir al Blog";
    return (
        <div className="App">
            <Header/>

            <Slider
                title={slideString}
                btn={buttonString}/>

            <div className="center">
                <Router />

                {/*<Peliculas />*/}

                <Sidebar/>

                <div className="clearfix"/>
            </div>

            <Footer/>
        </div>
    );
}

export default App;
