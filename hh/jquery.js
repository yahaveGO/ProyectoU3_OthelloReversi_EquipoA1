var tablero 		= [];
var jugadorActual 	= "Black"; //Gamer que inicia
var totalRows	= 8; //8
var totalCols 	= 8; //8

window.onload = function(){
	var tableroElem = document.getElementById('tablero');
	tableroElem.addEventListener("click", metodoTableroClicked, false);
	metodoinitTablero();	
};

function metodoinitTablero(){
	var i, j;
	for (i = 1; i <= totalRows; i++){
		$('tbody').append('<tr></tr>');
		for (j = 1; j <= totalCols; j++){
			tablero[index(i,j)] = null;
			$('tbody tr:nth-child('+i+')').append('<td><div class="cuadrado"></div></td>');
		}
	}	
	// tablero[index(2,2)]='White';
	// tablero[index(2,3)]='Black';
	// tablero[index(3,2)]='Black';
	// tablero[index(3,3)]='White';

	tablero[index(4,4)]='White';
	tablero[index(4,5)]='Black';
	tablero[index(5,4)]='Black';
	tablero[index(5,5)]='White';

	$('#idturnoGamer').text('Turno de la ficha : '+jugadorActual);
	metodoActualizarPiezaTablero();
	return 0;
}


function metodoTableroClicked(e){
	var x = e.clientX;
    var y = e.clientY;
    var tirada = false;

    var elementClicked = document.elementFromPoint(x, y);
    var index = $('.cuadrado').index(elementClicked);

    var cuadrado = metodoRowColTablero(index);
    var row = cuadrado[0];
    var col = cuadrado[1];

    if (tablero[index]!= null){		
		alert("Elemento del tablero ya en uso");
    }
    else{//Son if, ya que al tirar verifica las que se voltean a los 8 direciones
    	if (metodoRevisarTirada(row, col, 'arriba'))//				🡩
			tirada = true;		
		if (metodoRevisarTirada(row, col, 'abajo'))//				🡣
    		tirada = true;
		if (metodoRevisarTirada(row, col, 'izquierda'))//			🡠
    		tirada = true;
		if (metodoRevisarTirada(row, col, 'derecha'))//				🡢
			tirada = true;			
    	if (metodoRevisarTirada(row, col, 'diagonal_izq_arriba'))//		🡤
    		tirada = true;
    	if (metodoRevisarTirada(row, col, 'diagonal_der_abajo'))//		🡦
    		tirada = true;
    	if (metodoRevisarTirada(row, col, 'diagonal_der_arriba'))//		🡥
    		tirada = true;
    	if (metodoRevisarTirada(row, col, 'diagonal_izq_abajo'))//		🡧
			tirada = true;		

    	if (tirada){
    		tablero[index]=jugadorActual;
    		metodoActualizarPiezaTablero();
    		jugadorActual = metodoCambiarGamer();
			$('#idturnoGamer').text('Turno de la ficha : '+jugadorActual);
			metodoRevisar_Winner();
    	}
    	else{
			console.log('Movimiento invalido')
			$('#idturnoGamer').text('Tirada no valida: '+jugadorActual);
    	}
    }
}

function metodoRevisarTirada(row, col, orientacion){
	var tirada = true;
	var cambiarGamer = metodoCambiarGamer();
	var arrayVoltearPiezas = [];
	while (tirada){
		if (orientacion == 'arriba')
			row--;
		else if (orientacion == 'abajo')
			row++;
		else if (orientacion == 'izquierda')
			col--;
		else if (orientacion == 'derecha')
			col++;
		else if (orientacion == 'diagonal_izq_arriba'){			 
			col--;
			row--;
		}
		else if (orientacion == 'diagonal_der_abajo'){			
			col++;
			row++;
		}			
		else if (orientacion == 'diagonal_der_arriba'){						
			col++;
			row--;
		} 
		else if (orientacion == 'diagonal_izq_abajo'){			
			col--; 
			row++;
		}			

		var i = index(row, col);
		if (i == null) 
			return false;
		else if (tablero[i] == cambiarGamer){
			arrayVoltearPiezas.push(i);
		}
		else
			tirada = false;
	}
	if (arrayVoltearPiezas.length>0){
		if (tablero[i] == jugadorActual){ 
			metodoarrayVoltearPiezas(arrayVoltearPiezas);
			return true;
		}
	}
	return false;
}

function metodoarrayVoltearPiezas(arrayVoltearPiezas){
	for (var i = 0; i < arrayVoltearPiezas.length; i++){
		tablero[arrayVoltearPiezas[i]] = jugadorActual;
	}
	return 0;
}

function metodoActualizarPiezaTablero(){
	for (var i = 1; i <= totalRows; i++){
		for (var j=1; j <= totalCols; j++){
			if (tablero[index(i,j)] == "Black"){
				$('tbody tr:nth-child('+i+') :nth-child('+j+') :nth-child(1)').html('<div class="black piece"></div>');
			}
			if (tablero[index(i,j)] == "White"){
				$('tbody tr:nth-child('+i+') :nth-child('+j+') :nth-child(1)').html('<div class="white piece"></div>');
			}
		}
	}
	//return 0;
}

function metodoCambiarGamer(){
	if (jugadorActual == 'White')
		return 'Black';
	else 
		return 'White';
}

function index(row, col){ //indice del elemento en el tablero array, basado en las columnas y filas	
	if (row < 1 || col < 1)
		return null;	
	var arrayIndex = (row-1) * totalRows + col - 1;	
	return arrayIndex;
}

function metodoRowColTablero(index){//extraer col y row del index
	var row = Math.ceil((index+1) / totalRows);
	var col = (index+1) % totalCols;
	if (col == 0)
		col = 8;
	return [row, col];
}

function metodoRevisar_Winner(){	
	var contadorWhite 	= 0;
	var contadorBlack 	= 0;
	var contadorVacios	= -1;
	//alert(tablero);
	for (var z = 0; z <= tablero.length; z++){
		if (tablero[z] == 'White'){contadorWhite++;}
		else if (tablero[z] == 'Black'){contadorBlack++;}
		else{contadorVacios++;}
	}
	if (contadorVacios == 0){
		if (contadorWhite > contadorBlack)
			winner = 'White';
		else if (contadorWhite < contadorBlack)
			winner = 'Black';
		else if (contadorWhite == contadorBlack)
			winner = 'EMPATE!';
		else
			winner = '@error';
		
		$('#idturnoGamer').text("WINNER: "+winner);
		$('#idwhite').text("White: "+contadorWhite);
		$('#idblack').text("Black: "+contadorBlack);
		alert("WINNER");		
	}		
}