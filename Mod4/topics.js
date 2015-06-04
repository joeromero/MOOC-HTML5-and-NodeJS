//Topic5
//var express = require('express');
//var app = express();
//app.get('/coche', function (req, res){res.send( 'Coche' );});
//app.get('/casa/*', function (req, res){res.send( 'Casa' );});
//app.get('*', function (req, res){res.send( 'Nada' );});
//app.listen(8080);

//Topic6
//var express = require('express');
//var app = express();
//app.get('/:id1(\\d+)/:id2?', function (req,res){
//res.send( req.params.id1 + (req.params.id2 || ""));
//});
//app.get('*', function (req, res){res.send( 'Nadie' );});
//app.listen(8080);

//Topic7
var express = require('express');
var app = express();

// Middleware contador de visitas
app.use(function (req, res, next) {
	app.locals.cont = (app.locals.cont || 0);
	app.locals.cont += 1;
  	console.log('Visitas: ' + app.locals.cont);
  	next();
});

app.get('*', function(req,res){
	res.send('Visita número: ' + app.locals.cont);
});

app.listen(8000);