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
    tareaSelected(index){
        console.log(index);
        var tarea;
        this.state.tareas.map((e, i) => {
           if(index === i ){
               tarea = e;
           }
         });
       console.log(tarea);
       this.props.selectedTarea(tarea);
    }

    render() {
        if (this.state.stage === '0') {
            this.buscarDatosTarea();
            return (<div className="container">
                <br />
                <h1>buscando...</h1>
            </div>);
        } else {
            console.log(this.state);
            if (this.state.tareas === "not found") {
                return (
                    <div className="container">
                        <br />
                        <h1>Aun no hay tareas en este curso !</h1>

                    </div>)
            } else {
                const tareas = this.state.tareas.map((tarea, i) => {
                    return (
                        <div class="col-4">
                            <div class="card text-white my-3">
                                <h3 class="card-header">{tarea.NombreActividad}</h3>
                                <div class="card-body">
                                    <h5 class="card-title">Descripción</h5>
                                    <h6 class="card-subtitle text-white">{tarea.Problema}</h6>
                                    <br/>
                                    <div className="d-flex justify-content-end">
                                    <button class="btn btn-success" onClick={this.tareaSelected.bind(this,i)}>resolver</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
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