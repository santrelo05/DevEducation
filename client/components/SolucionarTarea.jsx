import React, { Component } from 'react';
import { throws } from 'assert';

class SolucionarTarea extends Component {
    constructor() {
        super();
        this.state = {
            language: 'Java',
            stdout: "",
            compile_output: "",
            stage: "0"
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        function getDatos(datos, i) {
            datos.numerico = i;
            return new Promise(function (resolve, reject) {
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
                    .then(function (myJson) {
                        resolve(myJson);
                    })
                    .catch(error => {
                        console.error('Error:', error)
                    });
            })
        }
        async function f1(datos, num) {
            var ss = [];

            for (var i = 0; i < num; i++) {
                ss[i] = await getDatos(datos, i);
            }
            console.log("este es el resultado")
            console.log(ss);
        }
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
        datos.input = this.state.selectedTarea.input;
        datos.output = this.state.selectedTarea.output;
        f1(datos, this.state.selectedTarea.Ciclo);
    }

    render() {
        if (this.state.stage === "0") {
            this.setState({
                selectedTarea: this.props.selectedtarea,
                stage: "1"
            })
            return (
                <h1>buscando..</h1>
            )
        }
        if (this.state.stage === "1") {
            console.log("mirando estado");
            console.log(this.state);
            return (
                <div className='container'>
                    <div class="jumbotron">
                        <h1 className="display-2">{this.state.selectedTarea.NombreActividad}</h1>
                        <br />
                        <br />
                        <h1>Problema</h1>
                        <p>{this.state.selectedTarea.Problema}</p>
                        <br />
                        <br />
                        <h1>Ejemplo</h1>
                        <div class="form-group">
                            <label for="exampleTextarea">Example textarea</label>
                            <textarea class="form-control" id="exampleTextarea" rows="5" disabled>{this.state.selectedTarea.Ejemplo}</textarea>
                        </div>


                        <br />
                        <br />
                        <h1 class="display-3">Manos a la obra!</h1>
                        <br />
                        <br />

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
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btnAzul btn-lg btn-block">Run</button>
                                </div>

                            </fieldset>
                        </form>
                    </div>
                </div>
            )
        }
    }
}
export default SolucionarTarea;