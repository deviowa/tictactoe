PLAYER_1 = "RED";
PLAYER_2 = "GREEN";

CURRENT_PLAYER = PLAYER_1;

function switch_player() {
    //swicth back and forth
    if (CURRENT_PLAYER == PLAYER_1) {
        CURRENT_PLAYER = PLAYER_2;
    } else {
        CURRENT_PLAYER = PLAYER_1;
    }
}

function is_valid_move(player, cell) {
    if (cell_is_owned(cell)) {
        return false;
    }
    return true;
}


function cell_is_owned(cell) {

    //if x owns it, it is owned indeed
    if ($(cell).hasClass("owned-by-" + PLAYER_1)) {
        return true;
    }
    //if Y owns it, it is owned as well
    else if ($(cell).hasClass("owned-by-" + PLAYER_2)) {
        return true;
    }

    //otherwise no one owns it yet
    else {
        return false;
    }

}

function mark_cell(player, cell) {
    //put that flag in the ground.
    var class_name = "owned-by-" + player;
    $(cell).addClass(class_name);
}


function reset() {
    $("div").removeClass("owned-by-" + PLAYER_1);
    $("div").removeClass("owned-by-" + PLAYER_2);
}


function check_for_draw() {
    num_owned_1 = $(".owned-by-" + PLAYER_1).length;
    num_owned_2 = $(".owned-by-" + PLAYER_2).length;
    if (num_owned_1 + num_owned_2 == 9) {
        return true;
    }
    return false;
}



function make_move(player, cell) {
    if (is_valid_move(player, cell) == false) {
        return false;
    }

    mark_cell(player, cell);

    winner = get_winning_player();
    if (winner) {
        congratulate_winner(winner);
        reset();
    }

    if (check_for_draw()) {
        alert("It's a draw!");
        reset();
    }

    switch_player();
    return true;
}

function get_winning_player() {
    var player_class = "owned-by-" + CURRENT_PLAYER;

    var grid = [];
    for (var i = 0; i < 9; i++) {
        var cell_state = $("#" + i).hasClass(player_class);
        grid.push(cell_state);
    }

    if (grid[0] && grid[1] && grid[2] ||
        grid[3] && grid[4] && grid[5] ||
        grid[6] && grid[7] && grid[8] ||
        grid[0] && grid[4] && grid[8] ||
        grid[2] && grid[4] && grid[6] ||
        grid[0] && grid[3] && grid[6] ||
        grid[1] && grid[4] && grid[7] ||
        grid[2] && grid[5] && grid[8]
    ) {
        return CURRENT_PLAYER;
    }

    return false;
}

function congratulate_winner() {
    alert("Player " + CURRENT_PLAYER + " Wins!")
}

function show_invalid_move_message() {
    alert("Invalid move");
}

$(".game-cell").on("click", function () {
    var cell = this;
    if (make_move(CURRENT_PLAYER, cell) == false) {
        //we should let them know they cant do that!
        show_invalid_move_message();
    }

});




// this is just to make the boxes square 
// (equal height to width)
$(".game-cell").each(function (index) {
    var cell = $(this);
    //cell.text(index);
    cell.height(cell.width());
});