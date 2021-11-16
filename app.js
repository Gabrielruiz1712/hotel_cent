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

console.log(__dirname);

app.get('/', (req, res)=>{
    res.send('Hola perrito');
})

app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:3000');
})