let empty_x = 300;
let empty_y = 300;
window.onload = function(){
	let puzzle = document.getElementById("puzzlearea").getElementsByTagName("div");
	let shuffle_button = document.getElementById("shufflebutton");
	for(let i = 0; i < puzzle.length; i++){
		puzzle[i].className = "puzzlepiece";
		puzzle[i].style.left = (i%4)*100 + "px";
		puzzle[i].style.top = (Math.floor(i/4)*100) + "px";
		puzzle[i].addEventListener("mouseover",function(){
			let piece = {x : parseInt(puzzle[i].style.left), y : parseInt(puzzle[i].style.top)};
			let empty_piece = {x : empty_x, y : empty_y};
			if(moveable_piece(piece, empty_piece)){
				puzzle[i].className = "puzzlepiece movablepiece";
			}else{
				puzzle[i].className = "puzzlepiece";
			}
		});
		puzzle[i].addEventListener("click",function(){
			let piece = {x : parseInt(puzzle[i].style.left) , y : parseInt(puzzle[i].style.top)};
			let empty_piece = {x : empty_x, y : empty_y};
			if(moveable_piece(piece, empty_piece)){
				let result = move_piece(piece, empty_piece);
				piece = {x : result[0].x , y : result[0].y};
				empty_piece = {x: result[1].x , y : result[1].y};
				puzzle[i].style.left = piece.x + "px";
				puzzle[i].style.top = piece.y + "px";
				empty_x = empty_piece.x;
				empty_y = empty_piece.y;
			}
		});
		shuffle_button.addEventListener("click",function(){
			let move_piece_list = [];
			for(let j = 0; j < 5; j++){
				for(let i = 0; i < puzzle.length; i++){
					let piece = {x : parseInt(puzzle[i].style.left), y : parseInt(puzzle[i].style.top)};
					let empty_piece = {x : empty_x, y : empty_y};
					if(moveable_piece(piece, empty_piece)){
						let result = move_piece_list.indexOf(puzzle[i]);
						if(result === -1){
							move_piece_list.push(puzzle[i]);
						}
					}else{
						let result = move_piece_list.indexOf(puzzle[i]);
						if(result > -1){
							move_piece_list.splice(result,1);
						}
					}
				}
				let random_index = Math.floor(Math.random()*move_piece_list.length);
				let tile = {x : parseInt(move_piece_list[random_index].style.left), y : parseInt(move_piece_list[random_index].style.top)};
				let empty_tile = {x : empty_x, y : empty_y};
				let arr = move_piece(tile, empty_tile);
				move_piece_list[random_index].style.left = arr[0].x + "px";
				move_piece_list[random_index].style.top = arr[0].y + "px";
				empty_x = arr[1].x;
				empty_y = arr[1].y;
			}
		});
	}
}
function move_piece(piece, empty_piece){
	let temp_piece = {x : empty_piece.x , y : empty_piece.y};
	empty_piece = {x : piece.x , y : piece.y};
	piece = {x : temp_piece.x , y : temp_piece.y};
	return [piece, empty_piece];
}
function moveable_piece(piece, empty_piece){
	if(piece.x === empty_piece.x){
		if(Math.abs(piece.y - empty_piece.y)<=100){
			return true;
		}
	}else{
		if(piece.y === empty_piece.y){
			if(Math.abs(piece.x - empty_piece.x)<=100){
				return true;
			}
		}else{
			return false;
		}
	}
	return false;
}