import React, { Component } from 'react';


class SolucionarTarea extends Component {
    constructor() {
        super();
        this.state = {
            language: 'Java',
            stdout: "",
            compile_output: "",
            stage: "0",
            reqcompile: false,
            ncompilo: false,
            npressbutt: 0,
            nejecfina: 0,
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Back = this.Back.bind(this);
    }

    handleInput(e) {
        const { value, name } = e.target;


        if (name === "language") {
            var encontroleng = false;
            this.state.cargarDatos.map((dato, i) => {
                if (dato.language === value) {
                    this.setState({
                        code: dato.code,
                        [name]: value,
                        ncompilo: false
                    });
                    encontroleng = true;
                }
            })
            if (encontroleng === false) {
                this.setState({
                    code: "",
                    [name]: value,
                    ncompilo: false
                });
            }
        } else {

            this.setState({
                [name]: value,
                ncompilo: false
            });
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({
            reqcompile: true,
            ncompilo: true,
            npressbutt: this.state.npressbutt + 1
        })
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
                if (ss[i].stdout === datos.output[i]) {
                    ss[i].result = true;
                }
                else {
                    if (ss[i].stdout === datos.output[i] + "\n") {
                        ss[i].result = true;
                    }
                    else {
                        ss[i].result = false;
                    }
                }
            }

            console.log(ss);
            return ss;
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
        var compilar = await f1(datos, this.state.selectedTarea.Ciclo);

        this.setState({
            compilar,
            reqcompile: false,
            nejecfina: this.state.nejecfina + 1
        })
    }
    guardarcodigo() {

        var datos = {};
        datos.idclase = this.props.idnum.id;
        datos.idtarea = this.state.selectedTarea.idtarea;
        datos.nickname = this.props.datos.nickname;
        datos.language = this.state.language;
        datos.code = this.state.code;
        console.log(datos);
        fetch('/guardarCodigo', {
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
                console.log("myjson");
                console.log(myJson);
            })
            .catch(error => {
                console.error('Error:', error)
            });
    }
    async codigosBusqueda() {
        function getDatos(datos) {
            return new Promise(function (resolve, reject) {
                fetch('/buscarCodigo', {
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


            });
        }
        async function f1(datos) {
            var result = await getDatos(datos);
            return result;
        }
        var datos = {};
        datos.idclase = this.props.idnum.id;
        datos.idtarea = this.props.selectedtarea.idtarea;
        datos.nickname = this.props.datos.nickname;
        var cargarDatos = await f1(datos);
        console.log("esto son los datossssssss");
        console.log(cargarDatos);
        var encontrojava = false;
        for (var d = 0; d < cargarDatos.length; d++) {
            console.log(cargarDatos[d].language);
            if (cargarDatos[d].language === "Java") {
                encontrojava = true;
                this.setState({
                    code: cargarDatos[d].code,
                    cargarDatos
                })
            }
        }
        if (encontrojava === false) {
            this.setState({
                cargarDatos
            })
        }

    }
    Back(){
        this.props.goback("2");
    }

    render() {
        if (this.state.stage === "0") {

            this.setState({
                selectedTarea: this.props.selectedtarea,
                stage: "1"
            })
            this.codigosBusqueda();
            return (
                <h1>buscando..</h1>
            )
        }
        if (this.state.stage === "1") {
            console.log("mirando estado");
            console.log(this.state);
            console.log("este es compilar");
            console.log(this.state.compilar);

            const abajo = (function (reqcompile) {
                if (reqcompile) {
                    return (
                        <div className="form-group">
                            <button className="btn btn-success btn-lg btn-block" disabled>
                                <div className="row  d-flex justify-content-center text-dark">
                                    <span class="spinner-border text-dark" role="status" aria-hidden="true"></span>
                                    <div>&nbsp;</div> <div>&nbsp;</div> <div>&nbsp;</div> Compilando . . .
                                </div>
                            </button>
                        </div>
                    )
                } else {
                    return (<div className="form-group">
                        <button type="submit" className="btn btnAzul btn-lg btn-block">Run</button>
                    </div>
                    )

                }
            }(this.state.reqcompile));
            var cont = 0;
            const casosdeprueba = this.state.selectedTarea.output.map((output, i) => {
                if (this.state.compilar === undefined) {
                    return (
                        <div class="alert alert-dismissible alert-secondary">
                            <strong>Caso de prueba # {i + 1}</strong> <br />
                        </div>
                    )
                } else {
                    if (this.state.compilar[i].result) {
                        cont++;
                        return (
                            <div class="alert alert-dismissible alert-success">
                                <strong>Caso de prueba # {i + 1}</strong> <br />
                            </div>
                        )
                    }
                    else {
                        return (
                            <div class="alert alert-dismissible alert-danger">
                                <strong>Caso de prueba # {i + 1}</strong> <br /><br />
                                tu output: <br />
                                {this.state.compilar[i].stdout}
                                <br /><br />
                                output esperado: <br />
                                {output}
                            </div>
                        )
                    }
                }
            });
            if (cont === this.state.selectedTarea.Ciclo) {
                if (this.state.ncompilo && this.state.nejecfina === this.state.npressbutt) {
                    this.guardarcodigo();
                    this.setState({
                        ncompilo: false
                    })
                }

            }
            return (
                <div className='container'>
                    <div class="jumbotron">
                        <button type="button" class="btn btn-danger" onClick={this.Back}> &lt;- </button>
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
                                        <option>PHP</option>
                                        <option>Python</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label >Code:</label>
                                    <textarea className="form-control" name='code' rows="12" value={this.state.code} onChange={this.handleInput} />
                                </div>

                                <div class="form-group">
                                    <label>output</label>
                                </div>
                                {abajo}
                                <br />
                                <br />
                                <div className="container">
                                    <div className="row d-flex justify-content-between">
                                        {casosdeprueba}
                                    </div>
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