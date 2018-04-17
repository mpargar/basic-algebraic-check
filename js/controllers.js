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
function errores(id, linea) {
  swal("Error"+id, ers[id]+linea+".", "error");
}

/*
////Eventos////
*/
$(document).ready(function() {
  $boton.click(function(event) {
    event.preventDefault();
    iniciarScanner($entrada[0].value);
  });

});
