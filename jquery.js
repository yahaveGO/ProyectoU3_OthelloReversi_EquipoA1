var board = [];
var currentPlayer = "Black";
var totalRows	= 8; //8
var totalCols 	= 8; //8

window.onload = function(){
	var boardElem = document.getElementById('board');
	boardElem.addEventListener("click", metodoTableroClicked, false);
	metodoinitTablero();	
};

function metodoinitTablero(){
	var i, j;
	for (i = 1; i <= totalRows; i++){
		$('tbody').append('<tr></tr>');
		for (j = 1; j <= totalCols; j++){
			board[index(i,j)] = null;
			$('tbody tr:nth-child('+i+')').append('<td><div class="square"></div></td>');
		}
	}	
	// board[index(2,2)]='White';
	// board[index(2,3)]='Black';
	// board[index(3,2)]='Black';
	// board[index(3,3)]='White';

	board[index(4,4)]='White';
	board[index(4,5)]='Black';
	board[index(5,4)]='Black';
	board[index(5,5)]='White';

	$('#currentplayer-text').text('Turno de la ficha : '+currentPlayer);
	metodoActualizarPiezaTablero();
	return 0;
}


function metodoTableroClicked(e){
	var x = e.clientX;
    var y = e.clientY;
    var validMove = false;

    var elementClicked = document.elementFromPoint(x, y);
    var index = $('.square').index(elementClicked);

    var square = getRowColFromIndex(index);
    var row = square[0];
    var col = square[1];

    if (board[index]!= null){
    	//console.log('there is already a piece there')
    }
    else{
    	if (metodoRevisarTirada(row, col, 'arriba'))//				🡩
			validMove = true;		
		else if (metodoRevisarTirada(row, col, 'abajo'))//			🡣
    		validMove = true;
		else if (metodoRevisarTirada(row, col, 'izquierda'))//		🡠
    		validMove = true;
		else if (metodoRevisarTirada(row, col, 'derecha'))//		🡢
			validMove = true;			
    	else if (metodoRevisarTirada(row, col, 'diagonal_izq_arriba'))//	🡤
    		validMove = true;
    	else if (metodoRevisarTirada(row, col, 'diagonal_der_abajo'))//		🡦
    		validMove = true;
    	else if (metodoRevisarTirada(row, col, 'diagonal_der_arriba'))//	🡥
    		validMove = true;
    	else if (metodoRevisarTirada(row, col, 'diagonal_izq_abajo'))//		🡧
			validMove = true;
		

    	if (validMove){
    		board[index]=currentPlayer;
    		metodoActualizarPiezaTablero();
    		currentPlayer = metodoCambiarGamer();
			$('#currentplayer-text').text('Turno de la ficha : '+currentPlayer);
			metodoRevisar_Winner();
    	}
    	else{
			console.log('Movimiento invalido')
			$('#currentplayer-text').text('Tirada no valida');
    	}
    }
}

function metodoRevisarTirada(row, col, orientacion){
	var tirada = true;
	var cambiarGamer = metodoCambiarGamer();
	var line = [];
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
		if (i==null) 
			return false;
		else if (board[i]==cambiarGamer){
			line.push(i);
		}
		else
			tirada = false;
	}
	if (line.length>0){
		if (board[i]==currentPlayer){ 
			metodoVoltearPiezas(line);
			return true;
		}
	}
	return false;
}

/*
function metodoRevisar_arriba(row, col){
	var continuous = true;
	var cambiarGamer = metodoCambiarGamer();
	var line = [];
	while (continuous){
		row--; 
		var i = index(row, col);
		if (i==null) 
			return false;
		else if (board[i]==cambiarGamer){
			line.push(i);
		}
		else
			continuous = false;
	}
	if (line.length>0){
		if (board[i]==currentPlayer){ 
			metodoVoltearPiezas(line);
			return true;
		}
	}
	return false;
}

function metodoRevisar_abajo(row, col){
	var continuous = true;
	var cambiarGamer = metodoCambiarGamer();
	var line = [];
	while (continuous){
		row++; 
		var i = index(row, col);
		if (i==null) //gone off the board
			return false;
		else if (board[i]==cambiarGamer){
			line.push(i);
		}
		else
			continuous = false;
	}
	if (line.length>0){
		if (board[i]==currentPlayer){ 
			metodoVoltearPiezas(line);
			return true;
		}
	}
	return false;
}

function metodoRevisar_izquierda(row, col){
	var continuous = true;
	var cambiarGamer = metodoCambiarGamer();
	var line = [];
	while (continuous){
		col--; 
		var i = index(row, col);
		if (i==null) //gone off the board
			return false;
		else if (board[i]==cambiarGamer){
			line.push(i);
		}
		else
			continuous = false;
	}
	if (line.length>0){
		if (board[i]==currentPlayer){ 
			metodoVoltearPiezas(line);
			return true;
		}
	}
	return false;
}

function metodoRevisar_derecha(row, col){
	var continuous = true;
	var cambiarGamer = metodoCambiarGamer();
	var line = [];
	while (continuous){
		col++; 
		var i = index(row, col);
		if (i==null) //gone off the board
			return false;
		else if (board[i]==cambiarGamer){
			line.push(i);
		}
		else
			continuous = false;
	}
	if (line.length>0){
		if (board[i]==currentPlayer){ 
			metodoVoltearPiezas(line);
			return true;
		}
	}
	return false;
}

function metodoRevisar_diagonal_izq_arriba(row, col){
	var continuous = true;
	var cambiarGamer = metodoCambiarGamer();
	var line = [];
	while (continuous){
		row--; 
		col--;
		var i = index(row, col);
		if (i==null) //gone off the board
			return false;
		else if (board[i]==cambiarGamer){
			line.push(i);
		}
		else
			continuous = false;
	}
	if (line.length>0){
		if (board[i]==currentPlayer){ 
			metodoVoltearPiezas(line);
			return true;
		}
	}
	return false;
}

function metodoRevisar_diagonal_der_abajo(row, col){
	var continuous = true;
	var cambiarGamer = metodoCambiarGamer();
	var line = [];
	while (continuous){
		row++;
		col++;
		var i = index(row, col);
		if (i==null) //gone off the board
			return false;
		else if (board[i]==cambiarGamer){
			line.push(i);
		}
		else
			continuous = false;
	}
	if (line.length>0){
		if (board[i]==currentPlayer){ 
			metodoVoltearPiezas(line);
			return true;
		}
	}
	return false;
}

function metodoRevisar_diagonal_der_arriba(row, col){
	var continuous = true;
	var cambiarGamer = metodoCambiarGamer();
	var line = [];
	while (continuous){
		row--;
		col++; 
		var i = index(row, col);
		if (i==null) //gone off the board
			return false;
		else if (board[i]==cambiarGamer){
			line.push(i);
		}
		else
			continuous = false;
	}
	if (line.length>0){
		if (board[i]==currentPlayer){ 
			metodoVoltearPiezas(line);
			return true;
		}
	}
	return false;
}

function metodoRevisar_diagonal_izq_abajo(row, col){
	var continuous = true;
	var cambiarGamer = metodoCambiarGamer();
	var line = [];
	while (continuous){
		row++;
		col--; 
		var i = index(row, col);
		if (i==null) //gone off the board
			return false;
		else if (board[i]==cambiarGamer){
			line.push(i);
		}
		else
			continuous = false;
	}
	if (line.length>0){
		if (board[i]==currentPlayer){ 
			metodoVoltearPiezas(line);
			return true;
		}
	}
	return false;
}
*/

function metodoVoltearPiezas(line){
	for (var i=0; i<line.length; i++){
		board[line[i]] = currentPlayer;
	}
	return 0;
}

function metodoActualizarPiezaTablero(){
	for (var i=1; i<=totalRows; i++){
		for (var j=1; j<=totalCols; j++){
			if (board[index(i,j)]=="Black"){
				$('tbody tr:nth-child('+i+') :nth-child('+j+') :nth-child(1)').html('<div class="black piece"></div>');
			}
			if (board[index(i,j)]=="White"){
				$('tbody tr:nth-child('+i+') :nth-child('+j+') :nth-child(1)').html('<div class="white piece"></div>');
			}
		}
	}
	return 0;
}

function metodoCambiarGamer(){
	if (currentPlayer == 'White')
		return 'Black';
	else 
		return 'White';
}

function index(row,col){
	// gives index of element in board array, based on row and col numbers
	if (row<1)
		return null;
	if (col<1)
		return null;
	var arrayIndex = (row-1)*totalRows+col-1;
	return arrayIndex;
}

function getRowColFromIndex(index){
	var row = Math.ceil((index+1)/totalRows);
	var col = (index+1)%totalCols;
	if (col == 0)
		col = 8;
	return [row, col];
}

function metodoRevisar_Winner(){	
	var contadorWhite 	= 0;
	var contadorBlack 	= 0;
	var contadorVacios	= -1;

	for (var z = 0; z <= board.length; z++){
		if (board[z] == 'White'){contadorWhite++;}
		else if (board[z] == 'Black'){contadorBlack++;}
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
		
		$('#currentplayer-text').text("WINNER: "+winner);
		$('#idwhite').text("White: "+contadorWhite);
		$('#idblack').text("Black: "+contadorBlack);
		alert("WINNER");		
	}		
}