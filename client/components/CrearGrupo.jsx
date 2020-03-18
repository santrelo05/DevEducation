import React, { Component } from 'react';



class CrearGrupo extends Component {
    constructor() {
        super();
        this.state = {
            stage: '0',
            nameclass:'',
            description:'',
            efenameclass:'form-control',
            efedescription:'form-control',
            valido: false
        };
        this.handleInput = this.handleInput.bind(this);
        this.crearClase = this.crearClase.bind(this);

    }

    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    crearClase(e){
        e.preventDefault();
        this.setState(validarCampos(this.state));
        if(this.state.valido){
            this.props.crearReq(this.state);
        }
    }

    render() {
        return (
            <div>
                <br /><br />
                <div className='container'>
                    <div class="jumbotron">
                        <h1 class="display-3">Crea tu clase !</h1>

                        <form onSubmit={this.crearClase}>
                            <fieldset>

                                <div className="form-group">
                                    <label>Nombre De la clase</label>
                                    <input type="text" className={this.state.efenameclass} name="nameclass" onChange={this.handleInput} />
                                    <div className="invalid-feedback">Llena el campo!</div>
                                </div>
                                <div class="form-group">
                                    <label >Descripción</label>
                                    <textarea class={this.state.efedescription} name='description' rows="4"onChange={this.handleInput} />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btnAzul btn-lg btn-block" >Crear Clase</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function validarCampos(datos){
    var cont = 0;
    if(datos.nameclass === ''){
        datos.valido = false;
        datos.efenameclass = 'form-control is-invalid';
    }
    else{
        cont++;
        datos.efenameclass = 'form-control is-valid';
    }

    if(datos.description === ''){
        datos.valido = false;
        datos.efedescription = 'form-control is-invalid';
    }
    else{
        cont++;
        datos.efedescription = 'form-control is-valid';
    }
    if(cont === 2){
        datos.valido = true;
    }

    return datos;
}
export default CrearGrupo;  