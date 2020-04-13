import React, { Component } from 'react';
import NavEstudiante from './NavEstudiante.jsx';
import ListarClaseE from './ListarClaseE.jsx';


class Estudiante extends Component {
    constructor() {
        super();
        this.state = {
            language: 'Java',
            stdout: "",
            stage: "0"
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onchangStage = this.onchangStage.bind(this);
    }

    onchangStage(data){
        this.setState({
            stage: data
        });

    }

    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        var patron = /↵/g;
        var cadena = this.state.code;
        cadena = cadena.replace(patron, " ");
        console.log(this.state);
        console.log(cadena);
        var datos = this.state;
        datos.code = cadena;
        if (datos.language === 'Java') {
            datos.language_id = 62;
        }
        if (datos.language === 'C') {
            datos.language_id = 50;
        }
        if (datos.language === 'C++') {
            datos.language_id = 54;
        }
        if (datos.language === 'C#') {
            datos.language_id = 51;
        }
        if (datos.language === 'Javascript') {
            datos.language_id = 68;
        }
        if (datos.language === 'Python') {
            datos.language_id = 71;
        }
        fetch('/compilar', {
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
                stdout: myJson.stdout,
                compile_output: myJson.compile_output
            }))
            .catch(error => {
                console.error('Error:', error)
            });

    }

    render() {
        if (this.state.stage === '0') {
            return(
                <div>
                    <NavEstudiante onchangStage={this.onchangStage}></NavEstudiante>
                    <h1>listar mis curos</h1>
                </div>
            )
        }
        if (this.state.stage === '1') {
            return(
                <div>
                    <NavEstudiante onchangStage={this.onchangStage} ></NavEstudiante>
                    <ListarClaseE datos={this.props.datos}></ListarClaseE>
                </div>
            )
        }
        if (this.state.stage === '3') {


            return (
                <div>
                    <NavEstudiante></NavEstudiante>
                    <br />
                    <br />
                    <div className='container'>
                        <div class="jumbotron">
                            <h1 class="display-3">Manos a la obra!</h1>

                            <form onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <div className="form-group">
                                        <select className="custom-select" name='language' onChange={this.handleInput}>
                                            <option>Java</option>
                                            <option>C</option>
                                            <option>C++</option>
                                            <option>C#</option>
                                            <option>Javascript</option>
                                            <option>PHP</option>
                                            <option>Python</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label >Code:</label>
                                        <textarea className="form-control" name='code' rows="12" onChange={this.handleInput} />
                                    </div>

                                    <div class="form-group">
                                        <label>output</label>
                                        <h1>{this.state.stdout}</h1>
                                        <h2>{this.state.compile_output}</h2>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btnAzul btn-lg btn-block">Run</button>
                                    </div>

                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>

            )
        }
    }

}

export default Estudiante;