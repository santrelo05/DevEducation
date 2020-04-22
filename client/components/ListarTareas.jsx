import React, { Component } from 'react';

class ListarTareas extends Component {
    constructor() {
        super();
        this.state = {
            stage: '0'
        }
        this.buscarDatosTarea = this.buscarDatosTarea.bind(this);
    }

    crearreq() {
        this.props.crearTareareq();
    }

    buscarDatosTarea() {
        fetch('/infoTarea', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(this.props.datosGrupo), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(function (response) {
                console.log(response.status);
                return response.json();
            })
            .then(myJson => this.setState({
                tareas: myJson,
                stage: '1'
            }))
            .catch(error => {
                console.error('Error:', error)
            });
    }
    render() {
        console.log(this.state);
        if (this.state.stage === '0') {
            this.buscarDatosTarea();
            return (<div className="container">
                <br />
                <h1>buscando...</h1>
            </div>);
        } else {

            if (this.state.tareas === "not found") {
                return (
                    <div className="container">
                        <br />
                        <h1>No tienes Tareas aun!, puedes crearla ahora mismo !</h1>
                        <div className="container">
                            {this.props.datosGrupo.nameclass}
                            <button type="submit" className="btn btnAzul btn-lg btn-block" onClick={this.crearreq.bind(this)}>Crear Tarea</button>
                        </div>
                    </div>)
            } else {
                const tareas = this.state.tareas.map((tarea, i) => {
                    return (
                        <div class="col-4 animated zoomIn faster">
                            <div class="card text-white my-3">
                                <h3 class="card-header">{tarea.NombreActividad}</h3>
                                <div class="card-body">
                                    <h5 class="card-title">Descripción</h5>
                                    <h6 class="card-subtitle text-muted">{tarea.Problema}</h6>
                                </div>
                            </div>
                        </div>
                    )
                });
                return (
                    <div className="container">
                        {this.props.datosGrupo.nameclass}
                        <button type="submit" className="btn btnAzul btn-lg btn-block" onClick={this.crearreq.bind(this)}>Crear Tarea</button>
                        <div class="container">
                            <div class="row">
                                {tareas}
                            </div>
                        </div>
                    </div>
                )

            }
        }

    }
}
export default ListarTareas;