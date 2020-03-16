import React, { Component } from 'react';


class Tabs extends Component {
    constructor() {
        super();
        this.state = {
            nickname: '',
            name: '',
            lastname: '',
            correo: '',
            password: '',
            radio: 'Estudiante',
            efenickname: 'form-control',
            efename: 'form-control',
            efelastname: 'form-control',
            efecorreo: 'form-control',
            efepassword: 'form-control',
            valido: true

        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loguear = this.loguear.bind(this);
    }

    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
        
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState(validarCampos(this.state));

        if(this.state.valido){
            this.props.onAddTodo(this.state);
        }
            

    }

    loguear(e){
        e.preventDefault();
        this.setState(validarCampos(this.state));

        if(this.state.nickname != '' && this.state.password != ''){
            this.props.loginReq(this.state);
        }
    }
 

    render() {
        if (this.props.message) {
            return (
                <div className="tab-pane fade active show" id="signIn">
                    <div className="jumbotron border-secondary">
                        <form onSubmit={this.loguear}>
                            <fieldset>
                                <legend>Sign In</legend>
                                <div className="form-group">
                                    <label>Nombre de usuario</label>
                                    <input type="text" className="form-control" name="nickname" placeholder="Enter Nickname"className={this.state.efenickname} onChange={this.handleInput}/>
                                    <div className="invalid-feedback">Llena el campo!</div>
                                </div>
                                <div className="form-group">
                                    <label>Contraseña</label>
                                    <input type="password" className="form-control" name="password" placeholder="*****" className={this.state.efepassword} onChange={this.handleInput}/>
                                    <div className="invalid-feedback">Llena el campo!</div>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btnAzul btn-lg btn-block" >Iniciar Sesión</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="tab-pane fade active show" id="signUp">
                    <div className="jumbotron border-secondary">
                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <legend>Sign Up</legend>
                                <div className="form-group">
                                    <label>Nombre de usuario</label>
                                    <input type="text" className={this.state.efenickname} name="nickname" placeholder="Enter Nickname" onChange={this.handleInput} />
                                    <div className="invalid-feedback">El nombre de usuario ya esta en uso, intenta con otro!</div>
                                </div>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type="text" className={this.state.efename} name="name" placeholder="Enter name" onChange={this.handleInput} />
                                </div>
                                <div className="form-group">
                                    <label>Apellido</label>
                                    <input type="text" className={this.state.efelastname} name="lastname" placeholder="Enter LastName" onChange={this.handleInput} />
                                </div>
                                <div className="form-group">
                                    <label>Correo</label>
                                    <input type="text" className={this.state.efecorreo} name="correo" placeholder="Ej = xxx@xx.com" onChange={this.handleInput} />
                                </div>
                                <div className="form-group">
                                    <label>Contraseña</label>
                                    <input type="text" className={this.state.efepassword} name="password" placeholder="Enter password" onChange={this.handleInput} />
                                </div>

                                <div className="form-group">
                                    <select className="custom-select" name='radio' onChange={this.handleInput}>
                                        <option>Estudiante</option>
                                        <option>Profesor</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btnAzul btn-lg btn-block">Registrarse</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            )
        }

    }

}
function validarCampos(datos){
    var cont = 0;
    if(datos.nickname == ''){
        datos.efenickname = 'form-control is-invalid';
        datos.valido = false;
    }
    else{
        datos.efenickname = 'form-control is-valid';
        cont++;
    }

    if(datos.name == ''){
        datos.efename = 'form-control is-invalid';
        datos.valido = false;
    }
    else{
        cont++;
        datos.efename = 'form-control is-valid';
    }

    if(datos.lastname == ''){
        datos.efelastname = 'form-control is-invalid';
        datos.valido = false;
    }
    else{
        cont++;
        datos.efelastname = 'form-control is-valid';
    }

    if(datos.correo == ''){
        datos.efecorreo = 'form-control is-invalid';
        datos.valido = false;
    }
    else{
        cont++;
        datos.efecorreo = 'form-control is-valid';
    }

    if(datos.password == ''){
        datos.efepassword = 'form-control is-invalid';
        datos.valido = false;
    }
    else{
        cont++;
        datos.efepassword = 'form-control is-valid';
    }
    if(cont == 5){
       datos.valido = true; 
    }
    return datos;
 }

export default Tabs;