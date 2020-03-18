import React, { Component } from 'react';
import NavProfesor from './NavProfesor.jsx';
import CrearGrupo from './CrearGrupo.jsx';


class Profesor extends Component {
    constructor() {
        super();
        this.state = {
            stage: '0'
        };
        this.onchangStage = this.onchangStage.bind(this);
        this.crearReq = this.crearReq.bind(this);
    }
    onchangStage(data){
        this.setState({
            stage: data
        });

    }
    
    crearReq(datta){
        this.props.crearReq(datta);
    }


    render(){
        if(this.state.stage === '0'){
            return(
                <div>
                    <NavProfesor onchangStage={this.onchangStage}/>
                </div>
            )
        }
        if(this.state.stage === '1'){
            return(
                <div>
                    <NavProfesor onchangStage={this.onchangStage}/>
                    <CrearGrupo crearReq={this.crearReq}/>
                </div>
            )
        }
        
    }
}
export default Profesor;