import React, { Component } from 'react';
import { Duplex } from 'stream';

class CrearActividad extends Component {
    constructor() {
        super();
        this.state = {
            ciclo: 1
        }
        this.removeInput=this.removeInput.bind(this);
        this.addInput = this.addInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    addInput(e){
        e.preventDefault();
        if(this.state.ciclo < 10){
            this.setState({
                ciclo: this.state.ciclo+1
            })
        }
    }
    removeInput(e){
        e.preventDefault();
        if(this.state.ciclo > 1){
            this.setState({
                ciclo: this.state.ciclo-1
            })
        }
    }

    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.dataActividad(this.state);
    }

    render() {
        
        var nn = [];
        for(var i = 0 ; i < this.state.ciclo ; i++){
            nn[i] = "";
        }
        const inputGenerator = nn.map((clase, i) => {
            return(
                <div>
                <hr className="bg-success"></hr>
                                <div className="container">
                                    <label>Input{i}:</label>
                                    <textarea className="form-control" name={"input"+i} rows="2" onChange={this.handleInput} />
                                    <label>output{i}:</label>
                                    <textarea className="form-control" name={"output"+i} rows="1" onChange={this.handleInput} />
                                </div>
                <hr className="bg-success"></hr>
                </div>
            )
        });
       



        return (
            <div className='container'>
                <div class="jumbotron">
                    <h1 class="display-3">Crea Tu Acitvidad</h1>

                    <form onSubmit={this.handleSubmit}>
                        <fieldset>

                            <div className="form-group">
                                <label>Nombre De la Acitvidad</label>
                                <input type="text" className="form-control" name="nombreActividad" onChange={this.handleInput} />
                                <div className="invalid-feedback">Llena el campo!</div>
                            </div>
                            <div class="form-group">
                                <label >Problema a Resolver</label>
                                <textarea className="form-control" name='Problema' rows="5" onChange={this.handleInput} />
                            </div>

                            <div class="form-group">
                                <label >Ejemplo explicado, con input y output</label>
                                <textarea className="form-control" name='Ejemplo' rows="4" onChange={this.handleInput} />
                            </div>

                            <div class="form-group">
                                <label >Casos De Prueba</label>
                              
                                
                                {inputGenerator}
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            <button className="btn btn-success btn-lg btn-block" onClick={this.addInput}> +</button>
                                        </div>
                                        <div className="col-sm">
                                            <button className="btn btn-danger btn-lg btn-block" onClick={this.removeInput}> - </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="bg-info"></hr>
                            <div className="form-group">
                                <button type="submit" className="btn btnAzul btn-lg btn-block" >Crear Acitvidad</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}
export default CrearActividad;