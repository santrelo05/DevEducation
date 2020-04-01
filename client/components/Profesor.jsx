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
        this.dataActividad = this.dataActividad.bind(this);
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
    dataActividad(data){
        data.id = this.state.id;
        fetch('/crearActividad', {
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
                stage: '0'
            }))
            .catch(error => {
                console.error('Error:', error)
            });
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
                    <CrearActividad dataActividad={this.dataActividad}></CrearActividad>
                </div>
            )
        }
        
    }
}
export default Profesor;