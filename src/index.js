const express = require('express');
const morgan = require('morgan');
const path = require('path');

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


app.listen(app.get('port'), () =>{
    console.log("Server on port ",app.get('port'));
});