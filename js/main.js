player1 = "X";
player2 = "O";

current_player = player1;

function switch_player() {
    //swicth back and forth
    if (current_player == player1) {
        current_player = player2;
    } else {
        current_player = player1;
    }
}

function is_valid_move() {
    //probably not 100% correct ?!
    return true;
}

function mark_cell(player, cell) {
    //put that flag in the ground.
    var class_name = "owned-by-" + player;
    $(cell).addClass(class_name);
}

function make_move(player, cell) {
    if (is_valid_move(player, cell) == false) {
        return false;
    }
    mark_cell(player, cell);
    switch_player();
    return true;
}

function get_winning_player() {
    return false;
}

function congratulate_winner() {
    alert("Thomas Wins!")
}

function show_invalid_move_message() {
    alert("Invalid move");
}

$("#tictactoe .row div").on("click", function () {
    var cell = this;
    if (make_move(current_player, cell) == false) {
        //we should let them know they cant do that!
        show_invalid_move_message();
    }

    winner = get_winning_player();
    if (winner) {
        congratulate_winner(winner);
        // maybe reset the game, at this point or let the 
        // user decide if they want to play another game as 
        // part of the congratulation?!
    }

});




// this is just to make the boxes square 
// (equal height to width)
$("#tictactoe .row div").each(function (index) {
    var cell = $(this);
    cell.text(index);
    cell.height(cell.width());
});