import React, { Component } from 'react';
import { throws } from 'assert';

class SolucionarTarea extends Component {
    constructor() {
        super();
        this.state = {
            stage: "0"
        }
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
            console.log(this.state.selectedTarea);
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
                                    <h1>{this.state.stdout}</h1>
                                    <h2>{this.state.compile_output}</h2>
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