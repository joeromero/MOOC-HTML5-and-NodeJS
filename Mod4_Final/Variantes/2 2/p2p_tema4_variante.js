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

		function cleanUpAccents(str)
		{
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

		var correcta_1a = correcta_1 .toLowerCase();
		var correcta_1b = cleanUpAccents(correcta_1a);
		var respuesta1_a = req.query.respuesta_1.toLowerCase();
		var respuesta_1_b = cleanUpAccents(respuesta1_a);

		var correcta_2a = correcta_2.toLowerCase();
		var correcta_2b = cleanUpAccents(correcta_2a);
		var respuesta2_a = req.query.respuesta_2.toLowerCase();
		var respuesta_2_b = cleanUpAccents(respuesta2_a);



	if(req.query.respuesta_1 || req.query.respuesta_2){

			

		if(req.query.respuesta_1){
		
			if(correcta_1b == respuesta_1_b){
				res.send('Acertaste, es :  ' + correcta_1 
					+ '<br><br><p><a href="/">PULSE SOBRE ESTE ENLACE PARA VOLVER A INTENTARLO</a></p>');
			}else{
				res.send('Lo siento, la respuesta correcta es :  ' + correcta_1
					+ '<br><br><p><a href="/">PULSE SOBRE ESTE ENLACE PARA VOLVER A INTENTARLO</a></p>');
			}

		}

		if(req.query.respuesta_2){

			if(correcta_2b == respuesta_2_b){
				res.send('Acertaste, es :  ' + correcta_2 
					+ '<br><br><p><a href="/">PULSE SOBRE ESTE ENLACE PARA VOLVER A INTENTARLO</a></p>');
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