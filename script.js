
// container style change
function createGrid(squaresPerSide = 16) {

    var myGrid = [...Array(squaresPerSide)].map(() => Array(squaresPerSide));

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

function move(grid) {
    var pos_1 = 0 , pos_2 = 0;
    current_div = grid[pos_1][pos_2];
    var temp;
    window.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) {
            return;
        }
        var temp = grid[pos_1][pos_2]
        switch (event.code) {
            case "KeyS":
                pos_1++;
                temp = grid[pos_1][pos_2];
                grid[pos_1][pos_2].style.backgroundColor = "black";
                grid[pos_1-1][pos_2].style.backgroundColor = "gray";
                break;
            case "KeyW":
                pos_1--;
                temp = grid[pos_1][pos_2];
                grid[pos_1][pos_2].style.backgroundColor = "black";
                grid[pos_1+1][pos_2].style.backgroundColor = "gray";
                break;
            case "KeyA":
                pos_2--;
                temp = grid[pos_1][pos_2];
                grid[pos_1][pos_2].style.backgroundColor = "black";
                grid[pos_1][pos_2+1].style.backgroundColor = "gray";
                break;
            case "KeyD":
                pos_2++;
                temp = grid[pos_1][pos_2];
                grid[pos_1][pos_2].style.backgroundColor = "black";
                grid[pos_1][pos_2-1].style.backgroundColor = "gray";
                break;
        }
        console.log("KeyPressed !");
    })
    return grid;

}

function mainLoop() {
    var grid = createGrid();
    grid[0][0].style.backgroundColor = "black";
    grid = move(grid);

    
}


mainLoop();