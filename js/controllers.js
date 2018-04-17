/*
  ////Variables////
*/
var $boton = $('#checkSyntax');
var $entrada = $('#text-container');
/*
  ////Errores////
*/
var ers = [];
ers[101] = 'Símbolo desconocido en linea ';
ers[202] = 'Falta delimitador en linea '
ers[203] = 'Falta identificador en linea '
ers[204] = 'Falta operador en linea '
ers[205] = 'Error Sintáctico, cerca de linea '

function errores(id, linea) {
  swal("Error #"+id, ers[id]+linea+".", "error");
}

/*
////Eventos////
*/
$(document).ready(function() {
  $boton.click(function(event) {
    event.preventDefault();
    if(iniciarScanner($entrada[0].value)){
      iniciarParser();
    }
  });

});
