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

	app.get('/register', (req, res) => {
		res.render('register.ejs');
	})

	app.post('/register', async (req, res) => {
		const Nombre = req.body.Nombre;
		const name = req.body.name;
		const Tipo = req.body.Tipo;
		const email = req.body.email;
		const Contraseña = req.body.contraseña;
		connection.query('INSERT INTO usuario SET ?', { Tipo: Tipo, Nombre: Nombre, Apellido: name, email: email, Contraseña: Contraseña }, async (error, results) => {
			if (error) {
				console.log(error);
			} else {
				res.render('register', {
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

	//11 - Metodo para la autenticacion
	app.post('/auth', async (req, res) => {
		const email = req.body.email;
		const Contraseña = req.body.Contraseña;
		if (email && Contraseña) {
			connection.query('SELECT * FROM usuarios WHERE user = ?', [email], async (error, results, fields) => {
				if (results.length == 0 || !(await bcrypt.compare(Contraseña, results[0].Contraseña))) {
					res.render('login', {
						alert: true,
						alertTitle: "Error",
						alertMessage: "USUARIO y/o PASSWORD incorrectas",
						alertIcon: 'error',
						showConfirmButton: true,
						timer: false,
						ruta: 'login'
					});

					//Mensaje simple y poco vistoso
					res.send('Incorrect Username and/or Password!');				
				} else {
					//creamos una var de session y le asignamos true si INICIO SESSION       
					req.session.loggedin = true;
					req.session.name = results[0].name;
					res.render('login', {
						alert: true,
						alertTitle: "Conexión exitosa",
						alertMessage: "¡LOGIN CORRECTO!",
						alertIcon: 'success',
						showConfirmButton: false,
						timer: 1500,
						ruta: 'inicio'
					});
				}
				res.end();
			});
		} else {
			res.send('Please enter user and Password!');
			res.end();
		}
	});

	app.listen(3000, (req, res) => {
		console.log('SERVER RUNNING IN http://localhost:3000');
	})



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