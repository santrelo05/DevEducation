import React, { Component } from 'react';

class ListarTareas extends Component {
    constructor() {
        super();
        this.state = {
        
        }
    }

    crearreq(){
        this.props.crearTareareq();
    }
    render(){
        return(
            <div className="container">
                
                <button type="submit" className="btn btnAzul btn-lg btn-block"  onClick={this.crearreq.bind(this)}>Crear Tarea</button>
            </div>
        )
    }
}
export default ListarTareas;