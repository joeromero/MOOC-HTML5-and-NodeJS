var express = require('express');
var path = require('path');
//var bp  	= require('body-parser');

var app 	= express();

//app.use(bp.urlencoded({extended:true}));

// instala middleware para manejar cualquier peticion que coincida con un archivo de la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/preguntas',function(req,res){
	
	var cabecera = "<html>\n<head>\n\t<title>P2P Obligatorio Módulo 4 x DEBS</title>\n\t<meta charset='UTF-8'>\n</head>\n";;
	var cuerpo = "\n<body>\n\t<h1>Cuestionario del P2P Obligatorio Módulo 4</h1>\n";
	var f11 = "\t<form method='get' action='/respuesta'>\n";
	var f12 = "\t\t¿Quién Descubrió América? <br>\n\t\t <input type=text value='' name='resp' /><br>\n\t\t<input type='submit' value='Enviar' /> ";
	var f13 = "\n\t<input type='hidden' name='preg' value='1'/>";
	var ffin =  "</form>"
	var f21 = "\n\n\t<br><form method='get' action='/respuesta'>\n";
	var f23 = "\n\t<input type='hidden' name='preg' value='2'/>";
	var f22 = "\t\t¿Capital de Portugal? <br>\n\t\t <input type=text value='' name='resp' /><br>\n\t\t<input type='submit' value='Enviar' /> ";
	
	var fin = "</body></html>";
	var form1 =  f11 + f12 + f13 + ffin;
	var form2 =  f21 + f22 + f23 + ffin;
	
	res.send(cabecera + cuerpo + form1  + form2 + fin);
});

app.get('/respuesta',function(req,res){
	function cleanUpAccents(str)
	 {
		 /* Función elaborada por Joaquin Gonzalez Santos. Del foro de Miriadax.net*/
	     str = str.replace(/[ÀÁÂÄ]/g,"A");
	     str = str.replace(/[àáâä]/g,"a");
	     str = str.replace(/[ÈÉÊË]/g,"E");
	     str = str.replace(/[èéêë]/g,"e");
	     str = str.replace(/[ÌÍÎÏ]/g,"I");
	     str = str.replace(/[ìíîï]/g,"i");
	     str = str.replace(/[ÒÓÔÖ]/g,"O");
	     str = str.replace(/[òóôö]/g,"o");
	     str = str.replace(/[ÙÚÛÜ]/g,"U");
	     str = str.replace(/[ùúûü]/g,"u");
	     return str;
	}
	
	var cabecera = "<html>\n<head>\n\t<title>P2P Obligatorio Módulo 4 x DEBS</title>\n\t<meta charset='UTF-8'>\n</head>\n";;
	var cuerpo = "\n<body>\n\t<h1>Cuestionario del P2P Obligatorio Módulo 4</h1>\n";
	cuerpo += "\n\t\t<a href='/preguntas'>Volver a la Página Inicial</a>";
	var vResp = req.query.resp.toLowerCase();
	var vid = req.query.preg;
	var vRespuestas = {1:"Cristobal Colon",2:"Lisboa"};
	
	var resp_oculta = "<hr><br>\n\tPregunta <b>" + vid + "</b> Tu respuesta: <b>" + vResp + "</b><hr>";
	var vMensaje = "";
	if(vRespuestas[vid].toLowerCase() === vResp || vRespuestas[vid].toLowerCase() === cleanUpAccents(vResp.toLowerCase()) ){
		vMensaje = "<h2>Tu Respuesta es correcta</h2>";
	}
	else{
		vMensaje = "<h2>Respuesta Incorrecta. <b>Respuesta Correcta: <i><u>"+ vRespuestas[vid] +"</u></i></b></h2>"
	}
	
	var fin = "</body></html>";
	res.send(cabecera + cuerpo + resp_oculta + vMensaje + fin);
});

app.get("*",function(req,res){
	res.send("Página no existe");
});
app.listen(8000);