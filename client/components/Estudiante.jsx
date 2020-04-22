import React, { Component } from 'react';
import NavEstudiante from './NavEstudiante.jsx';
import ListarClaseE from './ListarClaseE.jsx';
import ListarMisClasesE from './ListarMisClasesE.jsx';
import ListarTareasEst from './ListarTareasEst.jsx';
import SolucionarTarea from './SolucionarTarea.jsx';

class Estudiante extends Component {
    constructor() {
        super();
        this.state = {
            language: 'Java',
            stdout: "",
            stage: "0"
        }
       
        this.onchangStage = this.onchangStage.bind(this);
        this.selectedAclass = this.selectedAclass.bind(this);
        this.selectedTarea = this.selectedTarea.bind(this);
    }

    onchangStage(data) {
        this.setState({
            stage: data
        });

    }

   

    selectedAclass(data) {
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

    selectedTarea(data){
        this.setState({
            selectedTarea: data,
            stage: "3"
        });
    }


    render() {
        if (this.state.stage === '0') {
            return (
                <div>
                    <NavEstudiante onchangStage={this.onchangStage}></NavEstudiante>
                    <ListarMisClasesE datos={this.props.datos} selectedAclass={this.selectedAclass}></ListarMisClasesE>
                </div>
            )
        }
        if (this.state.stage === '1') {
            return (
                <div>
                    <NavEstudiante onchangStage={this.onchangStage} ></NavEstudiante>
                    <ListarClaseE datos={this.props.datos}></ListarClaseE>
                </div>
            )
        }

        if (this.state.stage === '2') {
            return (
                <div>
                    <NavEstudiante></NavEstudiante>
                    <br />
                    <br />
                    <div className="container d-felx justify-content-center">
                        <h1>{this.state.nameclass}</h1>
                    </div>
                    <br />
                    <br />
                    <ListarTareasEst idnum={this.state} selectedTarea={this.selectedTarea}></ListarTareasEst>
                </div>
            )

        }
        if(this.state.stage === "3"){
            console.log(this.state.selectedTarea);
            return(
            <div>
                <NavEstudiante></NavEstudiante>
                <br/><br/>
                <SolucionarTarea selectedtarea={this.state.selectedTarea}  datos={this.props.datos} idnum={this.state}></SolucionarTarea>
            </div>
            )
        }

        if (this.state.stage === '4') {

            return (
                <div>
                    <NavEstudiante></NavEstudiante>
                    <br />
                    <br />
                  
                </div>

            )
        }
    }

}

export default Estudiante;