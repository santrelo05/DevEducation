import React, { Component } from 'react';

class ListarTareasEst extends Component {
    constructor() {
        super();
        this.state = {
            stage: "0"
        }
        this.buscarDatosTarea = this.buscarDatosTarea.bind(this);
    }
    buscarDatosTarea() {
        console.log(this.props.idnum);
        fetch('/infoTarea', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(this.props.idnum), // data can be `string` or {object}!
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
    tareaSelected(index) {
        console.log(index);
        var tarea;
        this.state.tareas.map((e, i) => {
            if (index === i) {
                tarea = e;
            }
        });

        var datos = {
            idtarea: tarea.idtarea,
            idclase: this.props.idnum.id,
            nickname: this.props.datos.nickname
        }
        fetch('/tareaAbierta', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(datos), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(function (response) {
                console.log(response.status);
                return response.json();
            })
            .then(function (myJson) {
                //console.log("tareaAbierta");
                //console.log(myJson);
            })
            .catch(error => {
                console.error('Error:', error)
            });
        this.props.selectedTarea(tarea);
    }
    buscarIntentoCodigo() {
        var datos = {
            idclase: this.props.idnum.id,
            nickname: this.props.datos.nickname,
            tareas: this.state.tareas
        }
        fetch('/buscarIntentoCodigo', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(datos), // data can be `string` or {object}!
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
                stage: '2'
            }))
            .catch(error => {
                console.error('Error:', error)
            });
    }

    render() {
        if (this.state.stage === '0') {
            this.buscarDatosTarea();
            return (<div className="container">
                <br />
                <h1>buscando...</h1>
            </div>);
        }
        if (this.state.stage === "1") {
            this.buscarIntentoCodigo();
            return (<div className="container">
                <br />
                <h1>buscando</h1>
            </div>);
        }
        if (this.state.stage === "2") {
            console.log("estado listar tareassss");
            console.log(this.state);
            if (this.state.tareas === "not found") {
                return (
                    <div className="container">
                        <br />
                        <h1>Aun no hay tareas en este curso !</h1>

                    </div>)
            } else {
                const tareas = this.state.tareas.map((tarea, i) => {
                    if (tarea.red === undefined) {
                        return (
                            <div class="col-4">
                                <div class="card text-white my-3">
                                    <h3 class="card-header">{tarea.NombreActividad}</h3>
                                    <div class="card-body">
                                        <h5 class="card-title">Descripción</h5>
                                        <h6 class="card-subtitle text-white">{tarea.Problema}</h6>
                                        <br />
                                        <div className="d-flex justify-content-end">
                                            <button class="btn btn-success" onClick={this.tareaSelected.bind(this, i)}>resolver</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        if (tarea.red) {
                            return (
                                <div class="col-4">
                                    <div class="card text-white my-3 bg-danger">
                                        <h3 class="card-header">{tarea.NombreActividad}</h3>
                                        <div class="card-body">
                                            <h5 class="card-title">Descripción</h5>
                                            <h6 class="card-subtitle text-white">{tarea.Problema}</h6>
                                            <br />
                                            <div className="d-flex justify-content-end">
                                                <button class="btn btn-primary" onClick={this.tareaSelected.bind(this, i)}>resolver</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            const tags = tarea.redleng.map((tag, i) => {
                                return (<div>
                                    <span class="badge badge-pill badge-success">{tag}</span> &nbsp;
                                </div>
                                )
                            });
                            return (
                                <div class="col-4">
                                    <div class="card text-white my-3 bg-success">
                                        <h3 class="card-header">{tarea.NombreActividad}</h3>
                                        <div class="card-body">
                                            <h5 class="card-title">Descripción</h5>
                                            <h6 class="card-subtitle text-white">{tarea.Problema}</h6>
                                            <br />
                                            <div className="d-flex justify-content-end">
                                                <button class="btn btn-primary" onClick={this.tareaSelected.bind(this, i)}>resolver</button>
                                            </div>
                                        </div>
                                        <div className="card-header container">
                                            <div className="row">
                                            {tags}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    }


                });
                return (
                    <div className="container">
                        <div class="row">
                            {tareas}
                        </div>

                    </div>
                )
            }
        }
    }
}
export default ListarTareasEst;