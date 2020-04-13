import React, { Component } from 'react';

class ListarClaseE extends Component {
    constructor() {
        super();
        this.state = {
            stage: "0"
        }
        this.buscarGrupo = this.buscarGrupo.bind(this);
    }

    buscarGrupo() {
        fetch('/infoGrupos', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(this.state), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response.status);
                return response.json();
            })
            .then(myJson => this.setState({
                grupos: myJson,
                stage: '1'
            }))
            .catch(error => {
                console.error('Error:', error)
            });
    }
    selectedGrupo(index) {
        var grupo;
            this.state.grupos.map((e, i) => {
                if (index === i) {
                    grupo = e;
                }
            });
        if (window.confirm('Seguro que quieres unirte a "'+ grupo.nameclass + '"')){
            grupo.nickname = this.props.datos.nickname;
            fetch('/addGrupo', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(grupo), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    console.log(response.status);
                    return response.json();
                })
                .then(myJson => this.setState({
                    stage: '1'
                }))
                .catch(error => {
                    console.error('Error:', error)
                });
        }
        else{
            console.log(index);
        }
    
    }

    render() {
        console.log(this.props.datos);
        if (this.state.stage === "0") {
            this.buscarGrupo();
            return (<div className="container">
                <br />
                <h1>buscando...</h1>
            </div>);
        }
        if (this.state.stage === "1") {

            if (this.state.grupos === "not found") {
                return (
                    <div className="container">
                        <br />
                        <h1>No hay grupos en este momento!, espera a que un profesor cree un grupo</h1>
                    </div>)
            } else {
                console.log(this.state);
                const grupos = this.state.grupos.map((grupo, i) => {
                    return (
                        <div className="list-group mt-2">
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
export default ListarClaseE;