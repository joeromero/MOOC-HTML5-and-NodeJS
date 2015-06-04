var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.send('<html><body><div>'
   					+'<h1>CUESTIONARIO</h1>'

            			+'<form id="formulario1 method="get" action="/respuestas">'
            			+'<br>'
            			+'QUIEN DESCUBRIO AMERICA???<input type="text" name="respuesta_1"/>'
            			+'<br>'
            			+'<input type="hidden" name="param_oculto1" value="DESCONOCIDO"/>'
            			+'<br>'
            			+'<input type="submit" value="Enviar respuesta"/>'
            			+'</form>'

						+'<br>'

						+'<form id="formulario2" method="get" action="/respuestas">'
            			+'<br>'
            			+'CUAL ES LA CAPITAL DE PORTUGAL???<input type="text" name="respuesta_2"/>'
            			+'<br>'
            			+'<input type="hidden" name="param_oculto2" value="DESCONOCIDO"/>'
            			+'<br>'
            			+'<input type="submit" value="Enviar respuesta"/>'
            			+'</form>'
            			+'</div>'
            			+'</body>'
            			+'</html>');
});


app.get('/respuestas',function(req,res,next){
		var correcta_1 = 'Cristóbal Colón';
		var correcta_2 = 'Lisboa';

		

		if(req.query.respuesta_1 || req.query.respuesta_2){

				
		

		if(req.query.respuesta_1){
		
			if(req.query.respuesta_1 == correcta_1){
				res.send('Acertaste, es :  ' + correcta_1 
					+ '<br><br><p><a href="/">PRUEBA CON OTRA PREGUNTA</a></p>');
			}else{
				res.send('Lo siento, la respuesta correcta es :  ' + correcta_1
					+ '<br><br><p><a href="/">PULSE SOBRE ESTE ENLACE PARA VOLVER A INTENTARLO</a></p>');
			}

		}

		if(req.query.respuesta_2){

			if(req.query.respuesta_2 == correcta_2){
				res.send('Acertaste, es :  ' + correcta_2 
					+ '<br><br><p><a href="/">PRUEBA CON OTRA PREGUNTA</a></p>');
			}else{
				res.send('Lo siento, la respuesta correcta es :  ' + correcta_2
					+ '<br><br><p><a href="/">PULSE SOBRE ESTE ENLACE PARA VOLVER A INTENTARLO</a></p>');
			}
		}


		}else{
			res.send('<script>alert("NO HAS INTRODUCIDO NINGUNA RESPUESTA!!!")</script><p><a href="/">VUELVE A INTENTARLO</a></p>');
		}

});


app.listen(3000);