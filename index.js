document.addEventListener("DOMContentLoaded", () => {
    // get the HTML elements.
    const PARENT = document.querySelector("#container");
    const BUTTON_CONTAINER = document.querySelector("#buttonContainer");
    
    // Vars for the events of draw and the default worth of the grid, respectively.
    let draw = false;
    let numberOfSquares = 16;
    
    // Create a button to clean de grid.
    const limpiar = document.createElement("button");
    limpiar.textContent = "CLEAN IT UP";
    BUTTON_CONTAINER.appendChild(limpiar);
    
    // Create a button to change the size of the grid.
    const GridChange = document.createElement("button");
    GridChange.textContent = "CHANGE THE SIZE OF THE GRID";
    BUTTON_CONTAINER.appendChild(GridChange);
    
    
    function createGrid() {
        PARENT.innerHTML = '';
        
        for(i=1; i<= numberOfSquares*numberOfSquares; i++) {
            const DIV_CREATOR = document.createElement("div");
            DIV_CREATOR.classList.add("divChildGrid");
            PARENT.appendChild(DIV_CREATOR);    
        };

        // Put the number of grid for each row and column in the container
        PARENT.style.setProperty('--number-squares', numberOfSquares)
    }
    createGrid();
    
    // Logic of the button "GridChange" to change the size of the grid.
    GridChange.addEventListener("click", () => {
        const USER_INPUT = prompt("Give a number to change the Grid");
        const PARSED_INPUT = parseInt(USER_INPUT);
        if(!isNaN(PARSED_INPUT) && PARSED_INPUT >= 1 && PARSED_INPUT < 100) {
            numberOfSquares = PARSED_INPUT;
            createGrid();
        } else {
            alert("Please enter a valid number greater than or equal 1 and lower than 100");
        };
    });
    
    //Logic of the button "limpiar" to clean the grid.
    limpiar.addEventListener("click", () => {
        const GRID = document.querySelectorAll(".divChildGrid");
        GRID.forEach((celda1) => {
            if (celda1.style.backgroundColor !== "rgb(255, 255, 255)") {
                celda1.style.backgroundColor = "#fff";
            };
        });  
    });
    
    
    // Mouse movement
    PARENT.addEventListener("mousedown", () => {
        draw = true;
    });
    PARENT.addEventListener("mouseup", () => {
        draw = false;
    });
    PARENT.addEventListener("mousemove", (event) => {
        if(draw && event.target.classList.contains("divChildGrid")) {
            event.target.style.backgroundColor = "#000";
        }
    });
    



});