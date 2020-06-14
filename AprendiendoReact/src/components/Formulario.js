import React, {Component} from "react";
import Slider from "./slider/Slider";
import Sidebar from "./sidebar/Sidebar";

class Formulario extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    biografiaRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    state = {
        user: {}
    }

    recibirFormulario = (event) => {
        event.preventDefault();

        let genero;

        if (this.generoHombreRef.current.checked) {
            genero = 'Hombre';
        } else if (this.generoMujerRef.current.checked) {
            genero = 'Mujer';
        } else {
            genero = 'Otro';
        }

        let user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            biografia: this.biografiaRef.current.value,
            genero: genero
        }

        this.setState({
            user: user
        })
    }

    render() {
        return (
            <React.Fragment>
                <Slider
                    title="Formularo de contacto"
                    size="slider-small"/>

                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Formulario</h1>

                        {
                            this.state.user.nombre &&
                            <div id="user-data">
                                <p>Nombre: <strong>{this.state.user.nombre}</strong></p>
                                <p>Apellidos: <strong>{this.state.user.apellidos}</strong></p>
                                <p>Biografía: <strong>{this.state.user.biografia}</strong></p>
                                <p>Género: <strong>{this.state.user.genero}</strong></p>
                            </div>
                        }

                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.biografiaRef}/>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef}/> Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef}/> Mujer
                                <input type="radio" name="genero" value="otro" ref={this.generoOtroRef}/> Otro
                            </div>

                            <div className="clearfix"/>

                            <input type="submit" value="Enviar" className="btn btn-success"/>

                        </form>
                    </div>

                    <Sidebar
                        blog="true"/>

                    <div className="clearfix"/>
                </div>
            </React.Fragment>
        );
    }
}

export default Formulario;
