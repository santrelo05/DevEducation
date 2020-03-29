import React, { Component } from 'react';
class MisClasesP extends Component {
    constructor() {
        super();
        this.state = {
            stage: '0'
        };
        this.buscarDatos = this.buscarDatos.bind(this);
    }

    buscarDatos() {
        
        fetch('/infoClases', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(this.props.clasesP), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(function (response) {
                console.log(response.status);
                return response.json();
            })
            .then(myJson => this.setState({
                clases: myJson,
                stage: '1'
            }))
            .catch(error => {
                console.error('Error:', error)
            });

    }

    render() {
        if (this.state.stage === '0') {
            this.buscarDatos();
            return (<h1>buscando...</h1>);
        } else {
            const clases =  this.state.clases.map((clase, i) => {
                return (
                    <div class="list-group mt-2">
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{clase.nameclass}</h5>
                                <small>3 days ago</small>
                            </div>
                            <p class="mb-1">{clase.description}</p>
                            <small>Profesor: {clase.name} {clase.lastname}</small><br/>
                            <small>Correo: {clase.correo} </small>
                        </a>
                    </div>
                )

            });
            return (
                <div className="container">
                    <br />
                    {clases}
                </div>
            )
        }
    }

}
export default MisClasesP;
