import React, { Component } from 'react';
import Tabs from './Tabs.jsx';

class App extends Component {
    constructor() {
        super();
        this.state = {
            tab: true,
            stage: '0'
        };
        this.loginReq = this.loginReq.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    handleAddTodo(todo) {
        var data = {
            nickname: todo.nickname,
            name: todo.name,
            lastname: todo.lastname,
            correo: todo.correo,
            password: todo.password,
            radio: todo.radio
        }


        fetch('/registro', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(function (response) {
                console.log(response.status);
                if(response.status === 204){
                    alert('Nombre en uso');
                }
                return response.json();
            })
            .then(myJson => this.setState({
                nickname: myJson.nickname,
                name: myJson.name,
                lastname: myJson.lastname,
                correo: myJson.correo,
                password: myJson.password,
                stage: myJson.stage
            }))
            .catch(error => {
                console.error('Error:', error)
            });
    }

    changeTab(tabs) {
        this.setState({
            tab: tabs
        });

    }
    loginReq(datta) {
        var data = {
            nickname: datta.nickname,
            password: datta.password
        };

        fetch('/login', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(function (response) {
                console.log(response.status);
                return response.json();
            })
            .then(myJson => this.setState({
                nickname: myJson.nickname,
                name: myJson.name,
                lastname: myJson.lastname,
                correo: myJson.correo,
                password: myJson.password,
                stage: myJson.stage
            }))
            .catch(error => {
                console.error('Error:', error)
            });

        console.log(this.state);

    }
    holaa() {
        console.log('estas dentro de hola');
    }

    render() {
        console.log(this.state);
        if (this.state.stage === '0') {
            if (this.state.tab) {
                return (
                    <div>
                        <br></br>
                        <br></br>
                        <div className="container">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" onClick={this.changeTab.bind(this, true)} >Sign In</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.changeTab.bind(this, false)} >Sign Up</a>
                                </li>
                            </ul>
                            <div id="myTabContent" class="tab-content">
                                <Tabs loginReq={this.loginReq} message={this.state.tab} />
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="container">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.changeTab.bind(this, true)} >Sign In</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" onClick={this.changeTab.bind(this, false)} >Sign Up</a>
                            </li>
                        </ul>
                        <Tabs onAddTodo={this.handleAddTodo} message={this.state.tab} />

                    </div>
                )
            }

        }
        if (this.state.stage === '1') {
            return (
                <h1>Alumnooo</h1>
            )
        }
        if (this.state.stage === '2') {
            return (
                <h1>Profee</h1>
            )
        }
    }

}

export default App;