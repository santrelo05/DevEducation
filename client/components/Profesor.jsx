import React, { Component } from 'react';
import NavProfesor from './NavProfesor.jsx';
import CrearGrupo from './CrearGrupo.jsx';
import MisClasesP from './MisClasesP.jsx';
import ListarTareas from './ListarTareas.jsx';
import CrearActividad from './CrearActividad.jsx';

class Profesor extends Component {
    constructor() {
        super();
        this.state = {
            stage: '0'
        };
        this.onchangStage = this.onchangStage.bind(this);
        this.crearReq = this.crearReq.bind(this);
        this.selectedAclass= this.selectedAclass.bind(this);
        this.crearTareareq = this.crearTareareq.bind(this);
    }
    onchangStage(data){
        this.setState({
            stage: data
        });

    }
    selectedAclass(data){
        console.log("estas en profesor");
        console.log(data);
        this.setState({
            id: data.id,
            correo: data.correo,
            description: data.description,
            lastname: data.lastname,
            name: data.name,
            nameclass: data.nameclass,
            nickname: data.nickname,
            stage: '2'
        });
    }
    
    crearReq(datta){
        this.props.crearReq(datta);
    }
    crearTareareq(){
        console.log("update stage a 3");
        this.setState({
            stage: '3'
        })
    }


    render(){
        if(this.state.stage === '0'){
            return(
                <div>
                    <NavProfesor onchangStage={this.onchangStage}/>
                    <MisClasesP selectedAclass={this.selectedAclass} clasesP={this.props.datos}/>
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
        if(this.state.stage === '2'){
            return(
                <div>
                    <NavProfesor onchangStage={this.onchangStage}/>
                    <br/>
                    <ListarTareas crearTareareq={this.crearTareareq}></ListarTareas>
                </div>
                   
                
            )
        }
        if(this.state.stage === '3'){
            return (
                <div>
                    <NavProfesor onchangStage={this.onchangStage}/>
                    <br/>
                    <CrearActividad></CrearActividad>
                </div>
            )
        }
        
    }
}
export default Profesor;