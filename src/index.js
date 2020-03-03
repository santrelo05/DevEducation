const express = require('express');
const morgan = require('morgan');
const path = require('path');
const firebase = require('firebase');

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

const app = express();

//setting
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.get('/products', (req,res) =>{
    res.json("work");
});

app.post('/registro', (req , res) => {
    const { name , pass , last , correo , nick} = req.body;
    var ref = firebase.database().ref('Usuario');
        ref.once("value")
            .then(function(snapshot) {
                var a = snapshot.hasChild(nick);
                if(a == true){
                    res.json("nick");
                }else{
                    var userRef = firebase.database().ref('Usuario');
                    userRef.child(nick).set({
                        Contraseña: pass,
                        Nombre: name,
                        Correo:correo,
                        Apellido: last,
                      });
                      console.log('registro creado');
                      res.json('Successfully created');
                }
        });
});

app.post('/login',( req , res) =>{
    const {user , password} = req.body;
   
    var ref = firebase.database().ref('Usuario/'+user);
    ref.once('value')
       .then(function(snapshot) {
        if(password === snapshot.child("Contraseña").val()){
            res.json("successfully");
        }else{
            res.json("fail");
        }
        });
});

app.listen(app.get('port'), () =>{
    console.log("Server on port ",app.get('port'));
});


