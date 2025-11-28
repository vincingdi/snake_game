
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
        grid[pos_1][pos_2].style.backgroundColor = "black";
        grid[pos_1-1][pos_2].style.backgroundColor = "gray";
    }
    else if (direction.current_direction === 'Up') {
        pos_1--;
        grid[pos_1][pos_2].style.backgroundColor = "black";
        grid[pos_1+1][pos_2].style.backgroundColor = "gray";
    }
    else if (direction.current_direction === 'Left') {
        pos_2--;
        grid[pos_1][pos_2].style.backgroundColor = "black";
        grid[pos_1][pos_2+1].style.backgroundColor = "gray";
    } else if (direction.current_direction === 'Right') {
        pos_2++;
        grid[pos_1][pos_2].style.backgroundColor = "black";
        grid[pos_1][pos_2-1].style.backgroundColor = "gray";
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
        switch (event.code) {
            case "KeyS":
                direction_object.current_direction = direction_object.Down;
                break;
            case "KeyW":
                direction_object.current_direction = direction_object.Up;
                break;
            case "KeyA":
                direction_object.current_direction = direction_object.Left;
                break;
            case "KeyD":
                direction_object.current_direction = direction_object.Right;
                break;
        }
    });
}


function createFood(squaresPerSide, grid, foodPos) {
    let rowN = Math.floor(Math.random() * squaresPerSide);
    let columnN = Math.floor(Math.random() * squaresPerSide);
    grid[rowN][columnN].style.backgroundColor = "green";
    foodPos.pos1 = rowN;
    foodPos.pos2 = columnN;
    
}

function mainLoop() {
    squaresPerSide = 16;
    grid = createGrid(squaresPerSide);
    grid[0][0].style.backgroundColor = "black";
    window.setInterval(function() {
        move(grid, currentPos, direction);
        if (currentPos.pos1 == foodPos.pos1 && currentPos.pos2 == foodPos.pos2) {
            createFood(squaresPerSide, grid, foodPos);
        }
    }, 250);
    changeDirection(direction);
    createFood(squaresPerSide, grid, foodPos);
}



mainLoop();