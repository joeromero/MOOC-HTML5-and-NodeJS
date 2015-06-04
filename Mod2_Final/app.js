function agenda (titulo, inic) {
  var _titulo = titulo;
  var _contenido = inic;
  
  var _listar = function (datosAgenda) {
    var datos = "";
    for (var persona in datosAgenda) {
      datos += persona + ": " + datosAgenda[persona] + " ";
    }
    console.log(datos);
  };
 
  return {
    titulo: function()           { return _titulo; },
    meter:  function(nombre, tf) { _contenido[nombre]=tf; },
    tf:     function(nombre)     { return _contenido[nombre]; },
    borrar: function(nombre)     { delete _contenido[nombre]; },
    toJSON: function()           { return JSON.stringify(_contenido);},
    listar: function() 			     { return _listar(_contenido);}
  };
}

var amigos = agenda ("Amigos",
             { Pepe: 113278561,
               José: 157845123,
               Jesús: 178512355
             });
             
amigos.listar();