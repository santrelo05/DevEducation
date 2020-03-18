import React, { Component } from 'react';


class NavProfesor extends Component {
    constructor() {
        super();
        this.state = {
            misclases: 'nav-item active',
            crearclase: 'nav-item'
        };
    }

    changeStage(e) {

        if (e === '0') {
            this.setState({
                misclases: 'nav-item active',
                crearclase: 'nav-item'
            });
        }
        if (e === '1') {
            this.setState({
                misclases: 'nav-item',
                crearclase: 'nav-item active'
            })
        }
        
        this.props.onchangStage(e);

    }

    render() {
        console.log(this.state);
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <a class="navbar-brand" href="#">DevEduaction</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav mr-auto">
                        <li class={this.state.misclases} onClick={this.changeStage.bind(this, '0')}>
                            <a class="nav-link" >Mis Clases</a>
                        </li>
                        <li class={this.state.crearclase} onClick={this.changeStage.bind(this, '1')}>
                            <a class="nav-link" >Crear Clase</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Pricing</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">About</a>
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
export default NavProfesor;