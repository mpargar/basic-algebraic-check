  /*
  	/////Tabla de caracteres/////
  	Indices:
  	0 -> Token
  	1 -> Tipo
  	2 -> Codigo
  */
  var tabla = new Array();

  //Rellenar tabla con letras
  for(let i = 65; i<=90; i++){
  	tabla.push(new Array(String.fromCharCode(i), 1, 100 + (i-64)));
  }

  //Delimitadores
  tabla.push(new Array("(", 5, 501));
  tabla.push(new Array(")", 5, 502));
  tabla.push(new Array(";", 5, 503));

  //Operadores
  tabla.push(new Array("+", 7, 701));
  tabla.push(new Array("-", 7, 702));
  tabla.push(new Array("*", 7, 703));
  tabla.push(new Array("/", 7, 704));

  //Expresiones regulares
	var charValidos = new RegExp("[A-Z|\)|\(|\;|\+|\*|\/|\-]", "gi");

  /*
    /////////Otros componentes/////////
  */
  var renglones = new Array();
  /*
		Los indices de resultados:
		0 -> Caracter
		1 -> Renglon
	*/
	var resultados = new Array();

  /*
    //////////Funciones//////////
  */
  function getTokenInfo (token) {
    for(let i = 0; i<tabla.length; i++){
      if(tabla[i][0]==token){
        return tabla[i];
      }
    }
    return false;
  }

    function restTupla(renglon, char){
      let charInfo = getTokenInfo(char);
      return new Array(renglon, charInfo[0], charInfo[1], charInfo[2]);
    }

  function iniciarScanner (txt) {
    //Modulo entrada//
    event.preventDefault();
    renglones= new Array();
    resultados = new Array();
    //Separar por saltos
    txt = txt.split(/(\r\n|\n|\r)/gm);
    for(let i=0; i<txt.length; i++){
      if(/(\r\n|\n|\r)/gm.test(txt[i])){
        if(txt[i+1]=="" && /(\r\n|\n|\r)/gm.test(txt[i+2])){
          renglones.push(txt[i+1]);
          i=i+2;
        }
      }else{
        renglones.push(txt[i]);
      }
    }
    //Analizar renglones
    let error = false;
    for(let i = 0; i<renglones.length; i++){
      error=false;
      //Limpiar caracteres descartables
      renglones[i] = renglones[i].replace(/\s/g, "");
      //A mayusculas
      renglones[i] = renglones[i].toUpperCase();
      //Recorrer caracteres del renglon
      for(let j=0; j<renglones[i].length; j++){
        //Validar caracteres validos
        if(renglones[i].charAt(j).match(charValidos)!=null){
          resultados.push(restTupla(i+1, renglones[i].charAt(j)));
        }else{
          error=true;
          break;
        }
      }
      if (error) {
        errores(101, i+1);
        break;
      }
    }
    if(!error){
      console.log(resultados);
    }
  }
