import React, { Component } from 'react';
class MisClasesP extends Component {
    constructor() {
        super();
        this.state = {
            stage: '0'
        };
        this.buscarDatos = this.buscarDatos.bind(this);
    }
    
    selectedClass(index){
        var clase;
         this.state.clases.map((e, i) => {
            if(index === i ){
                clase = e;
            }
          });
        
        this.props.selectedAclass(clase);

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
        console.log('aquirr');
        console.log(this.state);
        if (this.state.stage === '0') {
            this.buscarDatos();
            return (<div className="container">
                <br/>
                <h1>buscando...</h1>
            </div>);
        } else {
            if (this.state.clases === "not found") {
                return (
                    <div className="container">
                        <br/>
                        <h1>No tienes clases aun!, puedes crearla ahora mismo !</h1>
                    </div>)
            } else {

                
                const clases = this.state.clases.map((clase, i) => {
                    return (
                        <div className="list-group mt-2 animated zoomIn faster">
                            <a href='#' className="list-group-item list-group-item-action flex-column align-items-start active" onClick={this.selectedClass.bind(this , i)}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{clase.nameclass}</h5>
                                    <small>3 days ago</small>
                                </div>
                                <p className="mb-1">{clase.description}</p>
                                <small>Profesor: {clase.name} {clase.lastname}</small><br />
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

}
export default MisClasesP;
