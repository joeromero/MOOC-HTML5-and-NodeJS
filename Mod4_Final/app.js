var express = require('express');
 var bodyParser = require('body-parser');
 var app = express();
 
 app.use(bodyParser.urlencoded({ extended: true }));
 
 app.get('/preguntas', function(req, res){
     res.send('<html><body><h1>Responde a las siguientes preguntas</h1>'
             +'<form method="post" action="/respuesta">'
            +'<input type="hidden" name="id" value="1"/>¿Quién descubrió América?<br>'
            +'<input type="text" name="resp1"/><br><input type="submit" value="Enviar"/></form><br>'
            +'<form method="post" action="/respuesta">'
            +'<input type="hidden" name="id" value="2"/>¿Capital de Portugal?<br>'
            +'<input type="text" name="resp2"/><br><input type="submit" value="Enviar"/></form></body></html>');
});

app.post('/respuesta', function(req, res, next){
    var primeraRespuesta = 'Cristóbal Colón';
    
    if(req.body.id === '1'){
        if(req.body.resp1 === primeraRespuesta){
            res.send("Tu respuesta <strong>" + req.body.resp1 + "</strong> es correcta."
                    + "<br><br><a href='/preguntas'>Volver a la página inicial</a>");
        }else{
            res.send("Tu respuesta <strong>" + req.body.resp1 + "</strong> es incorrecta.<br>"
                    + "La respuesta correcta es <strong>" + primeraRespuesta + "</strong>. Intentalo nuevamente."
                    + "<br><br><a href='/preguntas'>Volver a la página inicial</a>");
        }
    }else{
        next();
    }    
});

app.post('/respuesta', function(req, res){
    var segundaRespuesta = 'Lisboa';
    
    if(req.body.resp2 === segundaRespuesta){
        res.send("Tu respuesta <strong>" + req.body.resp2 + "</strong> es correcta."
                    + "<br><br><a href='/preguntas'>Volver a la página inicial</a>");
    }else{
        res.send("Tu respuesta <strong>" + req.body.resp2 + "</strong> es incorrecta.<br>"
                    + "La respuesta correcta es <strong>" + segundaRespuesta + "</strong>. Intentalo nuevamente."
                    + "<br><br><a href='/preguntas'>Volver a la página inicial</a>");
    }
});

app.listen(8000);
console.log('Listening on port 8000');