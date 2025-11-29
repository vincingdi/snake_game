
var direction = {
    current_direction: 'Right',
    Up: 'Up',
    Down: 'Down',
    Left: 'Left',
    Right: 'Right'
};

var currentPos = {
   pos1: 0,
   pos2: 0, 
}

var foodPos = {
    pos1: 0,
    pos2: 0,
}



function createGrid(squaresPerSide) {

    var myGrid = [...Array(squaresPerSide)].map(() => Array(squaresPerSide));

    // container style change
    var container = document.getElementById("container");
    container.innerHTML = '';
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.width = "640px";
    container.style.height = "640px";
    container.style.backgroundColor= "black";

            
    for (let i=0; i<squaresPerSide; i++) {
        for (let j=0; j<squaresPerSide; j++) {
            var div = document.createElement("div");
            div.style.width = 640 / squaresPerSide + "px";
            div.style.height = 640 / squaresPerSide + "px";
            div.style.backgroundColor  = "gray";
            // div.classList.add("grid-block");
            container.appendChild(div);
            myGrid[i][j] = div;

        }

    }

    return myGrid;
}

function move(grid, current_pos, direction) {
    var pos_1 = current_pos.pos1, pos_2 = current_pos.pos2;
    if (direction.current_direction === 'Down') {
        pos_1++;
        // grid[pos_1][pos_2].style.backgroundColor = "black";
        // grid[pos_1-1][pos_2].style.backgroundColor = "gray";
    }
    else if (direction.current_direction === 'Up') {
        pos_1--;
        // grid[pos_1][pos_2].style.backgroundColor = "black";
        // grid[pos_1+1][pos_2].style.backgroundColor = "gray";
    }
    else if (direction.current_direction === 'Left') {
        pos_2--;
        // grid[pos_1][pos_2].style.backgroundColor = "black";
        // grid[pos_1][pos_2+1].style.backgroundColor = "gray";
    } else if (direction.current_direction === 'Right') {
        pos_2++;
        // grid[pos_1][pos_2].style.backgroundColor = "black";
        // grid[pos_1][pos_2-1].style.backgroundColor = "gray";
    }

    current_pos.pos1 = pos_1;
    current_pos.pos2 = pos_2;
    
    
        
    return grid;
}

function changeDirection(direction_object) {
   
    window.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) {
            return;
        }
            if (event.code == "KeyS" && direction_object.current_direction != "Up"){
                direction_object.current_direction = direction_object.Down;
            } else if (event.code == "KeyW" && direction_object.current_direction != "Down") {
                direction_object.current_direction = direction_object.Up;
            } else if (event.code == "KeyA" && direction_object.current_direction != "Right") {
                direction_object.current_direction = direction_object.Left;
            } else if (event.code == "KeyD" && direction.current_direction != "Left") {
                direction_object.current_direction = direction_object.Right;
            }
    });
}


function createFood(squaresPerSide, foodPos) {
    let rowN = Math.floor(Math.random() * squaresPerSide);
    let columnN = Math.floor(Math.random() * squaresPerSide);
    foodPos.pos1 = rowN;
    foodPos.pos2 = columnN;
    
}


function boardClear(grid, squaresPerSide) {
    for (let i=0; i<squaresPerSide; i++) {
        for (let j=0; j<squaresPerSide; j++) {
            grid[i][j].style.backgroundColor = "gray";
        }
    }
}

function draw(snake_seg, seg_count, grid, foodPos) {
    grid[foodPos.pos1][foodPos.pos2].style.backgroundColor = "green";
    for (let i=0; i<seg_count; i++) {
        grid[snake_seg[i][0]][snake_seg[i][1]].style.backgroundColor = "black";
    }

}


function mainLoop() {
    squaresPerSide = 16;
    seg_count = 1;
    grid = createGrid(squaresPerSide);
    snake_seg = [[currentPos.pos1, currentPos.pos2]]
    let x1, x2, y1, y2;
    window.setInterval(function() {
        move(grid, currentPos, direction, snake_seg);
        for (let i=1; i<seg_count; i++) {
            x1 = snake_seg[i][0];
            x2 = snake_seg[i][1];
            console.log(x1, x2);

            if (i == 1) {
                snake_seg[i][0] = snake_seg[i-1][0];
                snake_seg[i][1] = snake_seg[i-1][1];
            } else {
                snake_seg[i][0] = y1;
                snake_seg[i][1] = y2;
            }
            y1 = x1;
            y2 = x2
        } 

        snake_seg[0][0] =  currentPos.pos1;
        snake_seg[0][1] =  currentPos.pos2;
        boardClear(grid, squaresPerSide);
        draw(snake_seg, seg_count, grid, foodPos)
        if (currentPos.pos1 == foodPos.pos1 && currentPos.pos2 == foodPos.pos2) {
            if (direction.current_direction == 'Down') {
               snake_seg.push([snake_seg[seg_count-1][0]-1, snake_seg[seg_count-1][1]]) 
            } 
            if (direction.current_direction == 'Up') {
               snake_seg.push([snake_seg[seg_count-1][0]+1, snake_seg[seg_count-1][1]]) 
            } 
            if (direction.current_direction == 'Right') {
               snake_seg.push([snake_seg[seg_count-1][0], snake_seg[seg_count-1][1]+1]) 
            } 
            if (direction.current_direction == 'Left') {
               snake_seg.push([snake_seg[seg_count-1][0]-1, snake_seg[seg_count-1][1]-1]) 
            } 
            seg_count++;
            createFood(squaresPerSide, foodPos);
        }
    }, 250);
    changeDirection(direction);
    createFood(squaresPerSide, foodPos);
}



mainLoop();