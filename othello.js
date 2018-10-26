(function(){
    //change the states of the piece
    var turn;
    var computer = 1; //change to 1 for start with white, 2 for black and 3 for human versos human
    var checkPiece = function(x, y, flip) {
        var ret = 0;
        for(var dx = -1; dx <= 1; dx ++){
            for(var dy = -1; dy<= 1; dy ++){
                if(dx == 0 && dy == 0){ continue; }
                    var nx = x + dx, ny = y + dy, n = 0;
                    while(board[nx][ny] == 3 - turn){ n++; nx += dx; ny += dy; }
                    if(n > 0 && board[nx][ny] == turn){
                        ret += n;
                        if(flip) {
                            nx = x + dx; ny = y + dy;
                            while(board[nx][ny] == 3 - turn){
                                board[nx][ny] = turn;
                                nx += dx;
                                ny += dy;
                            }
                            board[x][y] = turn;
                        }
                    }
                }
        }
        return ret;
    };
    
    //change turn
    var computerMove = function(){
        if(turn == computer){
        for (x = 1; x <= 8; x ++){
            for (y = 1; y <= 8; y ++){
                if(board[x][y] == 0 && checkPiece(x, y, true)){
                    turnChange();
                    return;
                }
            }
        }
    }
    };
    var turnChange = function(){
        var black = 0, white = 0;
        var x, y;
        turn = 3 - turn;
        var message = ((turn == 1)? "Black":"White") + "´s move";
        for (x = 1; x <= 8; x ++){
            for (y = 1; y <= 8; y ++){
                if(board[x][y] == 0 && checkPiece(x, y, false)){
                    document.getElementById('msg').innerHTML = message;
                    showBoard();
                    computerMove();
                    return;
                }
            }
        }

        //show message who won
        turn = 3 - turn;
        message += "pass<br>" + ((turn == 1)? "black":"White") + "´s move";
        for (x = 1; x <= 8; x ++){
            for (y = 1; y <= 8; y ++){
                if(board[x][y] == 0 && checkPiece(x,y, false)){
                    document.getElementById('msg').innerHTML = message;
                    showBoard();
                    computerMove();
                    return;
                }else{
                    if (board[x][y] == 1 ){ black ++; }
                    if (board[x][y] == 2) { white ++; }
                }
            }
        }
        message = "black: " + black + "white: " + white +"<br>";

        if(black == white){
            message += 'draw';
        } else {
            message += ((black > white)? "Black": "White: ") + "Won";
        }
        document.getElementById("msg").innerHTML = message;
        showBoard();
    };
    
    //show where you put a piece
    var piece;
    var showBoard = function(){
    var b = document.getElementById("board");
    while(b.firstChild){
        b.removeChild(b.firstChild);
    }

    for (var y = 1; y <= 8; y++){
        for (var x = 1; x <= 8; x++) {
            var c = piece[board[x][y]].cloneNode(true);
            c.style.left = ((x - 1) *32) + "px";
            c.style.top = ((y - 1) *32) + "px";
            b.appendChild(c);

            if( board[x][y] == 0 ) {
                (function(){
                var _x = x, _y = y;
                c.onclick = function(){
                    if (checkPiece(_x, _y, true)) {
                        turnChange();
                    }
                    showBoard();
                    };
                    })();
                    }
                }
            }
        };

    // show table
    var board = [];
    onload = function(){
        turn = 2;
        piece = [document.getElementById("cell"), document.getElementById("black"), document.getElementById("white")];
        for(var i = 0; i < 10; i++){
            board[i] = [];
            for (var j = 0; j < 10; j++) {
                board[i][j] = 0;                    
            }
        }
        board[4][5] = 1;
        board[5][4] = 1;
        board[4][4] = 2;
        board[5][5] = 2;
        turnChange();
        showBoard();
    };
})();