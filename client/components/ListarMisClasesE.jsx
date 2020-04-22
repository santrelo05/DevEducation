import React, { Component } from 'react';

class ListarMisClasesE extends Component {
    constructor() {
        super();
        this.state = {
            stage: "0"
        }
    }
    buscarMisGrupos() {
        fetch('/infoMisGrupos', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(this.props.datos), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response.status);
                return response.json();
            })
            .then(myJson => this.setState({
                misgrupos: myJson,
                stage: '1'
            }))
            .catch(error => {
                console.error('Error:', error)
            });
    }

    selectedGrupo(index) {
        var clase;
         this.state.misgrupos.map((e, i) => {
            if(index === i ){
                clase = e;
            }
          });
        console.log(clase);
        this.props.selectedAclass(clase);
    }

    render() {
        if (this.state.stage === "0") {
            this.buscarMisGrupos();
            return (<div className="container">
                <br />
                <h1>buscando...</h1>
            </div>);
        }
        if (this.state.stage === "1") {
            console.log(this.state);
            if (this.state.misgrupos === "not found") {
                return (
                    <div className="container">
                        <br />
                        <h1>No tienes grupos agregados en este momento!, Busca una clase</h1>
                    </div>)
            } else {
                
                const grupos = this.state.misgrupos.map((grupo, i) => {
                    return (
                        <div className="list-group mt-2 animated zoomIn faster">
                            <a href='#' className="list-group-item list-group-item-action flex-column align-items-start active" onClick={this.selectedGrupo.bind(this, i)}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{grupo.nameclass}</h5>
                                    <small>3 days ago</small>
                                </div>
                                <p className="mb-1">{grupo.description}</p>
                                <small>Profesor: {grupo.name} {grupo.lastname}</small><br />
                                <small>Correo: {grupo.correo} </small>
                            </a>
                        </div>
                    )

                });

                return (
                    <div className="container">
                        <br />
                        {grupos}
                    </div>
                )
            }
        }
    }
}

export default ListarMisClasesE;

