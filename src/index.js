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
    const { name , pass } = req.body;
    var userRef = firebase.database().ref('Usuario');
    userRef.child(name).set({
        Contraseña: pass,
      });
      console.log('registro creado');
      res.json('Successfully created');
});


app.listen(app.get('port'), () =>{
    console.log("Server on port ",app.get('port'));
});