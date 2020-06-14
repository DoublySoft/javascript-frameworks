import React, {Component} from "react";

class MiComponente extends Component {

    render() {
        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Jamón cocido'],
            calorias: 400
        }

        return (
            <React.Fragment>
                <h1>{'Receta: ' + receta.nombre}</h1>
                <h2>{'Calorías: ' + receta.calorias}</h2>
                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            return (<li>{ingrediente}</li>)
                        })
                    }
                </ol>
                <hr/>
                {
                    this.props.saludo &&
                    <React.Fragment>
                        <h1>Desde una prop: </h1>
                        <h3>{this.props.saludo}</h3>
                    </React.Fragment>
                }

            </React.Fragment>
        );
    }

}

export default MiComponente;
