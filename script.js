
// container style change
function createGrid(squaresPerSide = 16) {
    var container = document.getElementById("container");
    container.innerHTML = '';
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.width = "640px";
    container.style.height = "640px";
    container.style.backgroundColor= "black";

            
    for (let i=0; i<squaresPerSide*squaresPerSide; i++) {
        var div = document.createElement("div");
        div.style.width = 640 / squaresPerSide + "px";
        div.style.height = 640 / squaresPerSide + "px";
        console.log(div.style.height);
        div.style.backgroundColor  = "gray";
        div.classList.add("grid-block");
        container.appendChild(div);

    }
}

function mainLoop() {
    createGrid();
    
}


mainLoop();