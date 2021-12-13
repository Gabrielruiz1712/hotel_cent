//1- Invocamos a express
const express = require("express");
const app = express();

//2- Seteamos urlencoded para los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//3- Invocamos a detenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' })

//4- El directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5- Establecemos el motor de plantillas ejs
app.set('view engine', 'ejs');

//6- Invocamos a bcryptjs
const session = require('bcryptjs');

//7- Var de session
//const session = require('express-session');
//app.use(session({
//    secret:'seceret',
//  resave: true,
//saveUninitialized:TextTrackCue
//}));

//8- Invocamos al modulo de la conexion de la BD
const connection = require('./database/db');

//9- Estableciendo las rutas
app.get('/', (req, res) => {
	res.render('clinicio.ejs', { msg: 'ESTO ES UN MENSAJE DESDE NODE' });
    })

	app.get('/index', (req, res) => {
		res.render('index.ejs', { msg: 'ESTO ES UN MENSAJE DESDE NODE' });
	})

	//10- Ruta Login
	app.get('/login', (req, res) => {
		res.render('login.ejs');
	})

	//10- Ruta Inicio
	app.get('/inicio', (req, res) => {
		res.render('inicio.ejs');
	})

	//12- Ruta Registro de nuevo usuario
	app.get('/register', (req, res) => {
		res.render('register.ejs');
	})

	//13- Ruta reservaciones
	app.get('/reservacion', (req, res) => {
		res.render('reservacion.ejs');
	})

	//13- Ruta reservaciones
	app.get('/registrar', (req, res) => {
		res.render('registrar.ejs');
	})

	//14- Ruta habitaciones
	app.get('/habitaciones', (req, res) => {
		res.render('habitaciones.ejs');
	})

	//15- Ruta limpieza
	app.get('/limpieza', (req, res) => {
		res.render('limpieza.ejs');
	})

	//16- Ruta historial
	app.get('/historial', (req, res) => {
		res.render('historial.ejs');
	})

	//17- Ruta inicio de cliente
	app.get('/clinicio', (req, res) => {
		res.render('clinicio.ejs');
	})

	//17- Ruta eliminar usuario
	app.get('/eliminar', (req, res) => {
		res.render('eliminar.ejs');
	})

	app.get('/register', (req, res) => {
		res.render('register.ejs');
	})

// 	const router = require('express').Router();

// const customerController = require('../controllers/customerController');

// router.get('/', customerController.list);
// router.post('/add', customerController.save);
// router.get('/update/:id', customerController.edit);
// router.post('/update/:id', customerController.update);
// router.get('/delete/:id', customerController.delete);

// module.exports = router;

	app.post('/register', async (req, res) => {
		const Nombre = req.body.Nombre;
		const name = req.body.name;
		const Tipo = req.body.tipo;
		const email = req.body.email;
		const Con = req.body.Con;
		//console.log(Tipo)
		connection.query('INSERT INTO usuario SET ?', { Tipo: Tipo, Nombre: Nombre, Apellido: name, email: email, Contraseña: Con }, async (error, results) => {
			if (error) {
				//console.log(error);
				res.end();
				res.setHeader('X-Foo', 'bar')
			} else { 
				res.render('login', {
					alert: true,
					alertTitle: "Registration",
					alertMessage: "¡Successful Registration!",
					alertIcon: 'success',
					showConfirmButton: false,
					timer: 1500,
					ruta: 'login'
				});
				res.redirect('/');
			}
		});

	})
	
	var mysql      = require('mysql');  
	var connections = mysql.createConnection({  
 		 host     : 'bqvxdlbbxq2rfc3jiubf-mysql.services.clever-cloud.com',  
 		 user     : 'ukrztubgl7lpwen3',  
 		 password : '0S56oRhGGdMxNQXN5Ytr',  
 		 database : 'bqvxdlbbxq2rfc3jiubf'  
	});
	
app.get('/', function (req, res) {
	connections.connect();  
   
	connections.query('SELECT * FROM Usuario ', function(err, rows, fields)   
	{  
   
		if (err) throw err;  
   
		res.json(rows); 
		console.log(rows)
		 data: rows;
	});
	res.render('eliminar')
  });
//metodo eliminar usuario
app.post('/delete', async (req, res) => {
	const idusario = req.body.Con;
	//console.log(Tipo)
	connection.query('DELETE FROM usuario WHERE usuario.idUsuario = ?', [idusuario], async (error, results, fields) => {
		if (error) {
			console.log(error);
			res.end();
		} else { 
			res.render('inicio', {
				alert: true,
				alertTitle: "Registration",
				alertMessage: "¡Successful Elemination!",
				alertIcon: 'success',
				showConfirmButton: false,
				timer: 1500,
				ruta: 'inicio'
			});
			res.redirect('/');
		}
	});

})



	//11 - Metodo para la autenticacion
	app.post('/auth', async (req, res) => {
		const email = req.body.email;
		const Contraseña = req.body.Contraseña; 
		connection.query('SELECT * FROM usuario WHERE Email = ?', [email], async (error, results, fields) => {
		
		if (results.length == 1 && Contraseña == results[0].Contraseña){
			console.log('login entro')
			res.render('inicio', {
								alert: true,
								alertTitle: "Conexión exitosa",
								alertMessage: "¡LOGIN CORRECTO!",
								alertIcon: 'success',
								showConfirmButton: false,
								timer: 1500,
								ruta: 'inicio'
							});
		}else{
			console.log('login no ')
			res.render('login', {
								alert: true,
								alertTitle: "Error",
								alertMessage: "USUARIO y/o PASSWORD incorrectas",
								alertIcon: 'error',
								showConfirmButton: true,
								timer: false,
								ruta: 'login'
							});
		}
		});
	});

app.get('/', (req, res)=>{
    res.render('clinicio.ejs', {msg: 'ESTO ES UN MENSAJE DESDE NODE'});
})

//10- Ruta Login
app.get('/login', (req, res)=>{
    res.render('login.ejs');
})

//11- Ruta Login
app.get('/inicio', (req, res)=>{
    res.render('inicio.ejs');
})

//12- Ruta Registro de nuevo usuario
app.get('/register', (req, res)=>{
    res.render('register.ejs');
})

//13- Ruta reservaciones
app.get('/reservacion', (req, res)=>{
    res.render('reservacion.ejs');
})

//13- Ruta reservaciones
app.get('/registrar', (req, res)=>{
    res.render('registrar.ejs');
})

//14- Ruta habitaciones
app.get('/habitaciones', (req, res)=>{
    res.render('habitaciones.ejs');
})

//15- Ruta limpieza
app.get('/limpieza', (req, res)=>{
    res.render('limpieza.ejs');
})

//16- Ruta historial
app.get('/historial', (req, res)=>{
    res.render('historial.ejs');
})

//17- Ruta inicio de cliente
app.get('/clinicio', (req, res)=>{
    res.render('clinicio.ejs');
})

//18- Ruta inicio de confirmación
app.get('/clconfir', (req, res)=>{
    res.render('clconfir.ejs');
})
//  app.set('port', process.env.PORT || 3000)

app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN 185.42.117.108');
})
// app.listen(app.get('port'), () => {
// 	console.log('servidor arriba en el puerto ', app.get('port'));
// })



// $(document).ready(function() {
//     $(".search").keyup(function () {
//       var searchTerm = $(".search").val();
//       var listItem = $('.results tbody').children('tr');
//       var searchSplit = searchTerm.replace(/ /g, "'):containsi('")

//     $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
//           return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
//       }
//     });

//     $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
//       $(this).attr('visible','false');
//     });

//     $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
//       $(this).attr('visible','true');
//     });

//     var jobCount = $('.results tbody tr[visible="true"]').length;
//       $('.counter').text(jobCount + ' item');

//     if(jobCount == '0') {$('.no-result').show();}
//       else {$('.no-result').hide();}
//             });
//   });