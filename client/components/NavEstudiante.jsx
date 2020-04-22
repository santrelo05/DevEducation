import React, { Component } from 'react';

class NavEstudiante extends Component {
    constructor() {
        super();
        this.state = {
            stage: "0",
            misclases: 'nav-item active',
            buscarclase: 'nav-item'
        }
        this.validarDatos = this.validarDatos.bind(this);
    }

    changeStage(e) {
        if (e === '0') {
            this.setState({
                misclases: 'nav-item active',
                buscarclase: 'nav-item'
            });
        }
        if (e === '1') {
            this.setState({
                misclases: 'nav-item',
                buscarclase: 'nav-item active'
            })
        }
        this.props.onchangStage(e);
    }
    validarDatos(data) {
        console.log(data);
        if(data === "3"){
            this.props.changeit = "0";
            this.setState({
                misclases: 'nav-item',
                buscarclase: 'nav-item'
            })
        }
    }

    render() {

        this.validarDatos(this.props.changeit);
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <a class="navbar-brand" href="#">DevEduaction</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav mr-auto">
                        <li className={this.state.misclases} onClick={this.changeStage.bind(this, '0')}>
                            <a class="nav-link">Mis Clases</a>
                        </li>
                        <li className={this.state.buscarclase} onClick={this.changeStage.bind(this, '1')}>
                            <a class="nav-link">Buscar Clase</a>
                        </li>

                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="text" placeholder="Search" />
                        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        )

    }

}

export default NavEstudiante;