// var tablaSintactica = [
//    [null, '(', 'Id', ')', 'Op', ';', '$'],
//    ['Q', 'P;Q', 'P;Q', null, null, null, '^'],
//    ['P', '(FA', 'F', null, null, null, null],
//    ['A', 'P)', 'P)', ')G', null, null, null],
//    ['F', 'P', 'OG', null, null, null, null],
//    ['G', null, null, '^', 'RF', '^', '^'],
//    ['O', null, 'id', null, null, null, null],
//    ['R', null, null, null, 'Op', null, null]
// ]
var tablaSintactica = [
   [undefined, '(', '&', ')', '+', ';', '$'],
   ['1', '2;1', '2;1', undefined, undefined, undefined, '^'],
   ['2', '(43', '4', undefined, undefined, undefined, undefined],
   ['3', '2)', '2)', ')5', undefined, undefined, undefined],
   ['4', '2', '65', undefined, undefined, undefined, undefined],
   ['5', undefined, undefined, '^', '74', '^', '^'],
   ['6', undefined, '&', undefined, undefined, undefined, undefined],
   ['7', undefined, undefined, undefined, '+', undefined, undefined]
]

var esTerminal = new RegExp("[\)|\(|\;|\+|\&|\$|\-]", "gi");

function addDollarToArray(oldArray){
  let newArray = new Array();
  for(let i in oldArray){
    newArray.push( new Array(oldArray[i][0], oldArray[i][1], oldArray[i][2], oldArray[i][3]) )
  }
  newArray.push(new Array('$', '$', '$', '$'));
  return newArray;
}

function checkTablaSictactica(xi, ki){
  for(let i = 1; i<tablaSintactica.length; i++){
    if(xi == tablaSintactica[i][0]){
      for(let j = 1; j<tablaSintactica[0].length; j++){
        if(ki == tablaSintactica[0][j]){
          return tablaSintactica[i][j];
        }
      }
    }
  }
}

function insertarMatrizEnPila(m, p) {
  for(let i = m.length-1; i>=0; i--){
    p.push(m[i]);
  }
  return p;
}

function iniciarParser() {
  let x;
  let pila = new Array();
  pila.push('$', '1');
  let tablaLexica = addDollarToArray(resultados);
  let apun = 0;
  do{
    x = pila.pop();
    console.log(x + ' <-X');
    k = tablaLexica[apun][1] //1 Es el token
    /*
      Fixear K
    */
    k = (k.match(new RegExp("[A-Z]", "gi")) != null )?'&' : ( k.match(new RegExp("[\+|\*|\/|\-]", "gi")) !=null )?'+':k ;
    console.log(k + ' <-K');
    if(x.match(esTerminal)){
      console.log('----------------> ' +x + ' es terminal');
      if(x==k){
        apun++;
        console.log('El contador aumenta en 1 -> ' + apun);
      }else {
        errores(205, (tablaLexica[apun][0]!='$')?tablaLexica[apun][0]:tablaLexica[apun-1][0]);
        console.log('-----------------------ERROR1-----------------------------');
        console.log(pila);
        console.log(tablaLexica);
        console.log(x + ' <- X');
        console.log(k + ' <- K');
        console.log('---------------------------------------------------------');
        return false;
      }
    }else{
      console.log('----------------> ' + x + ' NO es terminal');
      let posicionMatriz = checkTablaSictactica(x,k);
      console.log(posicionMatriz + '<- POsicion matriz en la '+x+' '+k);
      if(posicionMatriz!=undefined){
        console.log('Es produccion');
        if(posicionMatriz!='^'){
          console.log('Es Lambda -> Inserta en la pila');
          pila = insertarMatrizEnPila(posicionMatriz.split(""), pila);
          console.log(pila);
        }
      }else{
        switch (x) {
          case '1':
          case '2':
          case '4':
          case '3':
            swal("Error #202 o #203", "Falta identificador o delimitador en línea "+tablaLexica[apun][0], "error")
            break;
          case '5':
          case '7':
            swal("Error #204", "Falta operador en línea "+tablaLexica[apun][0], "error")
            break;
          case '6':
            swal("Error #203", "Falta identificador en línea "+tablaLexica[apun][0], "error")
            break;
          default:

        }
        console.log('-----------------------ERROR2-----------------------------');
        console.log(pila);
        console.log(tablaLexica);
        console.log(x + ' <- X');
        console.log(k + ' <- K');
        console.log('---------------------------------------------------------');
        console.log(renglones);
        console.log(tablaLexica[apun-1][1]) //1 Es el token
        return false;
      }
    }
  }while (x!='$');

  swal("No hay errores", "El programa no pudo encontrar ningún error", "success");
}
