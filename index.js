const express = require('express');
const morgan = require('morgan');
const path = require('path');
const firebase = require('firebase');

const app = express();

const appdb = firebase.initializeApp({
    apiKey: "AIzaSyBDvYAUZ9yKtH_Uke9YvAPbqH7qGaUR1FQ",
    authDomain: "deveducation-c6783.firebaseapp.com",
    databaseURL: "https://deveducation-c6783.firebaseio.com",
    projectId: "deveducation-c6783",
    storageBucket: "deveducation-c6783.appspot.com",
    messagingSenderId: "923698382590",
    appId: "1:923698382590:web:2790139cac14487c8207af",
    measurementId: "G-XBLLQNCF0S"
});

//setting
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

app.post('/registro', (req, res) => {
    const { name, password, lastname, correo, nickname, radio } = req.body;
    var ref = firebase.database().ref('Usuario');
    ref.once("value")
        .then(function (snapshot) {
            var a = snapshot.hasChild(nickname);
            if (a == true) {
                var myJson = {
                    nickname :'',
                    name : '',
                    lastname : '',
                    correo : '',
                    password :'',
                    stage:'0'
                }
                res.status(204).json(myJson);
            } else {
                var ref1 = firebase.database().ref('filtroProfe');
                ref1.once("value")
                    .then(function (snapshot) {
                        var a = snapshot.hasChild(nickname);
                        if (a == true) {
                            var myJson = {
                                nickname : '',
                                name : '',
                                lastname : '',
                                correo : '',
                                password :'',
                                stage:'0'
                            }
                            res.status(204).json(myJson);
                        }
                        else {
                            var ref2 = firebase.database().ref('Profesor');
                            ref2.once("value")
                                .then(function (snapshot) {
                                    var a = snapshot.hasChild(nickname);
                                    if (a == true) {
                                        res.status(500).json("nick");
                                    } else {
                                        if (radio === 'Estudiante') {
                                            var ref3 = firebase.database().ref('Usuario');
                                            ref3.child(nickname).set({
                                                Contraseña: password,
                                                Nombre: name,
                                                Correo: correo,
                                                Apellido: lastname,
                                            });
                                            var myJson = {
                                                nickname,
                                                name,
                                                lastname,
                                                correo,
                                                password,
                                                stage:'1'
                                            }
                                            console.log('registro creado');
                                            res.status(201).json(myJson);
                                        }
                                        else {
                                            var ref3 = firebase.database().ref('filtroProfe');
                                            ref3.child(nickname).set({
                                                Contraseña: password,
                                                Nombre: name,
                                                Correo: correo,
                                                Apellido: lastname,
                                            });
                                            var myJson = {
                                                nickname,
                                                name,
                                                lastname,
                                                correo,
                                                password,
                                                stage:'0'
                                            }
                                            console.log('registro creado');
                                            res.status(200).json(myJson);
                                        }
                                    }
                                });
                        }
                    });
            }
        });

});

app.post('/login', (req, res) => {
    const { password, nickname } = req.body;
    var ref = firebase.database().ref('Usuario/' + nickname);
    ref.once('value')
        .then(function (snapshot) {
            if (password === snapshot.child("Contraseña").val()) {
                    var myJson = {
                        nickname,
                        name: snapshot.child("Nombre").val(),
                        lastname: snapshot.child("Apellido").val(),
                        correo: snapshot.child("Correo").val(),
                        password: snapshot.child("Contraseña").val(),
                        stage: '1'
                    }
                    res.status(201).json(myJson);
                
            } else {
                var ref1 = firebase.database().ref('Profesor/' + nickname);
                ref1.once('value')
                    .then(function (snapshot) {
                        if (password === snapshot.child("Contraseña").val()) {
                            var myJson = {
                                nickname,
                                name: snapshot.child("Nombre").val(),
                                lastname: snapshot.child("Apellido").val(),
                                correo: snapshot.child("Correo").val(),
                                password: snapshot.child("Contraseña").val(),
                                clases: snapshot.child("Clases").val(),
                                stage: '2'
                            }
                            res.status(201).json(myJson);
                        } else {
                            res.status(201).json('0');
                        }
                    });
            }
        });

});


app.post('/crearGrupo', (req, res) => {
    const { nickname , name , lastname , nameclass , description, correo } = req.body;
    var ref = firebase.database().ref('Grupos/');
    var newPostRef = ref.push();
    newPostRef.set({
        nickname,
        name,
        lastname,
        nameclass,
        description,
        correo
    });

    newPostRef.once('value')
       .then(function(snapshot) {
        var key = snapshot.key;
        var ref1 = firebase.database().ref('Profesor/'+nickname);
            ref1.once('value')
            .then(function(snapshot){
                var clases = snapshot.child('Clases').val();
                if(clases === null){
                    clases = [key];
                }else{
                    clases.push(key);
                }
                var ref2 = firebase.database().ref('Profesor/'+nickname);
                ref2.update({
                    Clases: clases
                });

            });
        });

    res.status(201).json("grupo creado");
});

app.post('/infoClases', (req, res) => {
    const { nickname } = req.body;
    function getDatos(claseid){
        return new Promise(function(resolve,reject){
            var ref = firebase.database().ref('Grupos/'+claseid);
            ref.once('value')
            .then(function(snapshot){
            
                var newjson = 
                {id: claseid,
                correo: snapshot.child("correo").val(),
                description: snapshot.child("description").val(),
                lastname: snapshot.child("lastname").val(),
                name: snapshot.child("name").val(),
                nameclass: snapshot.child("nameclass").val(),
                nickname: snapshot.child("nickname").val(),
            }
            resolve(newjson);
         });
         
        })
    }    

    async function f1(classarr){
        var ss=[];
        if(classarr === null){
            ss="not found";
            res.status(200).json(ss);
        }else{

        
        for(var i = 0 ; i< classarr.length ; i++){
           ss[i] = await getDatos(classarr[i]);    
        }
        
        res.status(200).json(ss);
        }
    }

    var ref1 = firebase.database().ref('Profesor/'+nickname);
   
    ref1.once('value')
       .then(function(snapshot) {
        f1(snapshot.child("Clases").val());
    });
   
});

app.post('/crearActividad', (req, res) => {
    const {nombreActividad , Problema, Ejemplo, ciclo, id} = req.body;
    const {input0,input1,input2,input3,input4,input5,input6,input7,input8,input9} = req.body;
    const {output0,output1,output2,output3,output4,output5,output6,output7,output8,output9} = req.body;
    var input=[];
    var output=[];
    var aux=[];
    var aux1=[];
    aux.push(input0);aux.push(input1);aux.push(input2);aux.push(input3);aux.push(input4);aux.push(input5);aux.push(input6);aux.push(input7);aux.push(input8);aux.push(input9);
    aux1.push(output0);aux1.push(output1);aux1.push(output2);aux1.push(output3);aux1.push(output4);aux1.push(output5);aux1.push(output6);aux1.push(output7);aux1.push(output8);aux1.push(output9);
    for(var i = 0; i < 10 ; i++){
        if(aux[i] !== undefined){
            input.push(aux[i]);
        }
        if(aux1[i] !== undefined){
            output.push(aux1[i]);
        }       

    }
    
    var ref = firebase.database().ref('Grupos/'+id+'/Tareas');
    var newPostRef = ref.push();
    newPostRef.set({
        NombreActividad : nombreActividad,
        Problema,
        Ejemplo,
        Ciclo:ciclo,
        input,
        output
    });
 
    

res.status(200).json(req.body);
});

app.post('/compilar', (req, res) => {
    var code = {
        source_code: req.body.code, 
        language_id: req.body.language_id,
        stdin: "casa"
    }
    
    
    async function compilar() {
        // Compilar
        let response = await fetch('https://api.judge0.com/submissions?base64_encoded=false&wait=false', {
            method: 'post',
            body: JSON.stringify(code),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert("HTTP-Error: " + response.status);
        }
    
        // ver el resultado
        let r;
        while (true) {
            let result = await fetch(`https://api.judge0.com/submissions/${json.token}?base64_encoded=false&wait=false`);
            if (result.ok) {
                r = await result.json();
            } else {
                alert("HTTP-Error: " + result.status);
            }
            if (r.status.id != 1 && r.status.id != 2) {
                break;
            }
        }
        console.log(r);
        res.status(200).json(r);
        
    }
    
    compilar();
});


app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
});