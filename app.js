//1- Invocamos a express
const express = require("express");
const app = express();

//2- Seteamos urlencoded para los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//3- Invocamos a detenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'})

//4- El directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5- Establecemos el motor de plantillas ejs
//app.set('view engine', 'ejs');

//6- Invocamos a bcryptjs
//const session = require('bcryptjs');

//7Var de session
//const session = require('express-session');
//app.use(session({
    //secret:'seceret',
    //resave: true,
    //saveUninitialized:TextTrackCue
//}));


//8- Invocamos al modulo de la conexion de la BD
//const connection = require('./database/db');

//9- Estableciendo las rutas
app.get('/', (req, res)=>{
    res.render('index.ejs');
})

app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:3000');
})