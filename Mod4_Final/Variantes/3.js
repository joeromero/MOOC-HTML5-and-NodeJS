var express = require('express');
var path = require('path');
//var bodyParser = require('body-parser'); <- si se quiere incluir body-parser
//var methodOverride = require('method-override'); <- si se quiere incluir override
var app = express();
//app.use(bodyParser.urlencoded({ extended: true })); <- cargar bodyparser
//app.use(methodOverride('_method')); <- cargar override
//app.use(express.static(path.join(__dirname,'public'))); <- si se desea dejar a express manejar peticiones a directorio
/* Site: clase base para representar un sitio virtual o físico */
function Site(){
	this.routes = [];
	this.templates = {};
}
Site.prototype.addRoute = function(entry){
	this.routes.push(entry);
};
Site.prototype.findRoute = function(path){
	for(var i = 0;i < this.routes.length;i++){
		if(this.routes[i]["path"] === path) return this.routes[i];
	}
};
Site.prototype.getRoutes = function(){
	return this.routes;
};
Site.prototype.addPageTemplate = function(page,template){
	if(this.templates[page]){
		this.templates[page].push(template);
	}else{
		this.templates[page] = [template];
	}
};
Site.prototype.renderPageTemplates = function(page,vars){
	var lastTemplate = "";
	for(var i = this.templates[page].length-1;i >= 0;i--){
		var template = this.templates[page][i];
		if(vars[i]){
			for(key in vars[i]){
				template = template.replace("{$"+key+"}",vars[i][key]);
			}
		}
		if(template.indexOf("[$template]") >= 0){
			template = template.replace("[$template]",lastTemplate);
		}
		lastTemplate = template;
	}
	return lastTemplate;
};
/* SiteQuestion: clase que deriva de base y representa nuestro sitio de preguntas */
function SiteQuestion(){
	this.pages = ["preguntas","respuesta"];
	this.questions = [
		{"q":"¿Quién descubrió América?","a":"Cristóbal Colón"},
		{"q":"¿Capital de Portugal?","a":"Lisboa"}
	];

	for(var i = 0;i < this.pages.length;i++){
		this.addPageTemplate(this.pages[i],
			"<!DOCTYPE html><html><head><meta charset='UTF-8'><title>{$title}</title></head><body>[$template]</body></html>");
	}
	
	this.addPageTemplate("preguntas",
		"<h1>Preguntas</h1> \
		<form method='GET' action='/respuesta'> \
			<p>{$question_one}</p> \
			<input type='text' name='respuesta' /> \
			<input type='hidden' name='pregunta' value='1' /> \
			<input type='submit' value='Enviar' /> \
		</form> \
		<form method='GET' action='/respuesta'> \
			<p>{$question_two}</p> \
			<input type='text' name='respuesta' /> \
			<input type='hidden' name='pregunta' value='2' /> \
			<input type='submit' value='Enviar' /> \
		</form>");
	this.addPageTemplate("respuesta",
		"<div> \
			<p>La respuesta a la pregunta {$answer_response}</p> \
			<a href='/preguntas'>Volver a la página inicial</a> \
		</div>");
}
SiteQuestion.prototype = new Site();
SiteQuestion.prototype.handlerPreguntas = function(req,res,next){
	res.send(this.renderPageTemplates("preguntas",[
		{"title":"Preguntas"},
		{"question_one":this.questions[0]["q"],"question_two":this.questions[1]["q"]}
	]));
};
SiteQuestion.prototype.handlerRespuesta = function(req,res,next){
	var question = this.questions[req.query.pregunta-1];
	var response;
	if(req.query.respuesta === question["a"] || req.query.respuesta === question["a"].toLowerCase()){
		response = question["q"]+" es correcta";
	}else{
		response = question["q"]+" es incorrecta, la respuesta correcta es "+question["a"];
	}
	res.send(this.renderPageTemplates("respuesta",[
		{"title":"Respuesta"},
		{"answer_response":response}
	]));
};
/* SERVER: Singleton wrapper para manejar express e integrarlo con las clases Site */
var SERVER = (function(){
	var routes = [];
	var sites = {};

	var addSite = function(options){
		sites[options["name"]] = options["site"];
	};
	var addHtAccessEntry = function(entry){
		routes.push(entry);
	};
	var init = function(){
		for(var site in sites){
			var siteRoutes = sites[site].getRoutes();
			for(var i = 0;i < siteRoutes.length;i++){
				var siteRoute = siteRoutes[i];
				app.use(siteRoute["path"],function(req,res,next){ next(); });
				app[siteRoute["type"]](siteRoute["path"],typeof siteRoute["handler"] 
					=== 'function' ? siteRoute["handler"] : 
						(function(theSite,theHandler){
							return function(req,res,next){ 
								try{theSite[theHandler].apply(theSite,arguments);}catch(err){ next(err); } 
							}
						})(sites[site],"handler"+siteRoute["handler"]));
			}
		}
		for(var i = 0;i < routes.length;i++){
			if(routes[i]["path"]){
				app.use(routes[i]["path"],function(req,res,next){ next(); });
				app[routes[i]["type"]](routes[i]["path"],routes[i]["handler"]);
			}else{
				app.use(routes[i]["handler"]);
			}
		}
	};
	var start = function(options){
		app.listen(options["port"]);
	};

	return {
		"addSite":addSite,
		"addHtAccessEntry":addHtAccessEntry,
		"init":init,
		"start":start
	};
})();

var mod4Site = new SiteQuestion();
mod4Site.addRoute({"type":"get","path":"/preguntas","handler":"Preguntas"});
mod4Site.addRoute({"type":"get","path":"/respuesta","handler":"Respuesta"});
SERVER.addSite({"name":"mod4Site","site":mod4Site});
SERVER.addHtAccessEntry({"type":"get","path":"*","handler":function(req,res){
	res.status(404).send("404 - recurso invalido");
}});
SERVER.addHtAccessEntry({"handler":function(err, req, res, next){
	res.status(500).send("500 - error en el servidor");
}});
SERVER.init();
SERVER.start({"port":8000});