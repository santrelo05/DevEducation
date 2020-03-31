import React, { Component } from 'react';
import { Duplex } from 'stream';

class CrearActividad extends Component {
    constructor() {
        super();
        this.state = {
            ciclo: 1
        }
    }

    render() {
        return (
            <div className='container'>
                <div class="jumbotron">
                    <h1 class="display-3">Crea Tu Acitvidad</h1>

                    <form onSubmit={this.crearActividad}>
                        <fieldset>

                            <div className="form-group">
                                <label>Nombre De la Acitvidad</label>
                                <input type="text" className="form-control" name="nameclass" onChange={this.handleInput} />
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
                                <hr className="bg-success"></hr>
                                <div className="container">
                                    <label>Input:</label>
                                    <textarea className="form-control" name='Ejemplo' rows="2" onChange={this.handleInput} />
                                    <label>output:</label>
                                    <textarea className="form-control" name='Ejemplo' rows="1" onChange={this.handleInput} />
                                </div>
                                <hr className="bg-success"></hr>
                                <hr className="bg-success"></hr>
                                <div className="container">
                                    <label>Input:</label>
                                    <textarea className="form-control" name='Ejemplo' rows="2" onChange={this.handleInput} />
                                    <label>output:</label>
                                    <textarea className="form-control" name='Ejemplo' rows="1" onChange={this.handleInput} />
                                </div>
                                <hr className="bg-success"></hr>
                                
                                <button type="submit" className="btn btnAzul btn-lg btn-block" > + </button>
                            </div>


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