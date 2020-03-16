import React, { Component } from 'react';
import Tabs from './Tabs.jsx';

class App extends Component {
    constructor() {
        super();
        this.state = {
            tab: true
        };
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
        

        fetch('/registro',{
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
            }
    
        })
        .then(function(response) {
            console.log(response.status);
            return response.json();
        })
        .then(function(myJson) {
            console.log('server'+myJson);
            if(myJson=="nick"){
               
 
            }else{
                alert('registro creado');
            }
        })
        .catch(error => {
            console.error('Error:', error)
        });
    }

    changeTab(tabs){
        this.setState({
            tab: tabs
        });

    }

    render() {
        if(this.state.tab){
            return (
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
                    <Tabs onAddTodo={this.handleAddTodo} message={this.state.tab}/>
                    </div>
    
                </div>
            )
        }
        else{
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
                    <Tabs onAddTodo={this.handleAddTodo} message={this.state.tab}/>
    
                </div>
            )
        }
        
    }

}

export default App;