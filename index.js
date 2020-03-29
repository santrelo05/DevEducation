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
                nick: snapshot.child("nick").val(),
            }
            resolve(newjson);
         });
         
        })
    }    
    async function f1(){
        var ss=[];
    
        for(var i = 0 ; i< req.body.length ; i++){
           ss[i] = await getDatos(req.body[i]);    
        }
        console.log(ss);
        res.status(200).json(ss);
    }
        f1();
});


app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
});