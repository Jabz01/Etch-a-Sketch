document.addEventListener("DOMContentLoaded", () => {
    // get the HTML elements.
    const PARENT = document.querySelector("#container");
    const BUTTON_CONTAINER = document.querySelector("#buttonContainer");
    const BACK_CONTAINER = document.querySelector("#BackToNormalContainer");
    const TRANSPARENCY_CONTAINER = document.querySelector(".TransparencyContainer");
    const DARKER_MODE_CONTAINER = document.querySelector("#DarkerModeContainer");
   
    // Vars for the events of draw and the default worth of the grid, respectively.
    let draw = false;
    let numberOfSquares = 16; //Default number of the grid
    let ColorCase = "Black";
    let TransparencyNumber = 1; 
    let ButtonClicked = ""; //Var to know what classes add or remove in accordance of what
    let Color = ""
    const TransparencyLevels = { Cell: 0};
    let DarkerActive = "";
    //button was clicked.



    
    // Create a button to clean de grid.
    const Clear = document.createElement("button");
    Clear.textContent = "CLEAN IT UP";
    BUTTON_CONTAINER.appendChild(Clear);

    //Button to eraser in the grid
    const EraserButton = document.createElement("button");
    EraserButton.textContent = "ERASER";
    BUTTON_CONTAINER.appendChild(EraserButton);
    
    //Button to return to the black color in the grid
    const ReturnToBlackButton = document.createElement("button");
    ReturnToBlackButton.textContent = "BACK TO BLACK";
    ReturnToBlackButton.classList.add("Desactive");
    BACK_CONTAINER.appendChild(ReturnToBlackButton);


    // Create a button to change the size of the grid.
    const GridChange = document.createElement("button");
    GridChange.textContent = "CHANGE THE SIZE OF THE GRID";
    BUTTON_CONTAINER.appendChild(GridChange);
    
    // Create a button to randomize the square's RGB
    const RandomizeButton = document.createElement("button");
    RandomizeButton.textContent = "I FEEL LUCKY TODAY";
    BUTTON_CONTAINER.appendChild(RandomizeButton);
    RandomizeButton.id = "RandomizeButton";

    //Buttons and Text to change the transparency of each divChildGrid
    const LessTransparencyButton = document.createElement("button");
    LessTransparencyButton.textContent = "-";
    LessTransparencyButton.classList.add("TransparencyButton");
    const MoreTransparencyButton = document.createElement("button");
    MoreTransparencyButton.textContent = "+";
    MoreTransparencyButton.classList.add("TransparencyButton");
    const transparencyText = document.createElement("h5");
    transparencyText.textContent = "TRANSPARENCY";
    TRANSPARENCY_CONTAINER.appendChild(LessTransparencyButton);
    TRANSPARENCY_CONTAINER.appendChild(transparencyText);
    TRANSPARENCY_CONTAINER.appendChild(MoreTransparencyButton);


    //Darker game button
    const DarkerButton = document.createElement("button");
    DarkerButton.textContent = "Darker mode";
    DARKER_MODE_CONTAINER.appendChild(DarkerButton);

    // FUNCTIONS ---------------------------------------------------------




    //a function that use a bucle for to create a grid (by default 16*16)
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


    //Function to use the logic of the nodeList in the const "GRID" to change the background
    function ClearFunction() {
        const GRID = document.querySelectorAll(".divChildGrid");
        GRID.forEach((celda1) => {
            if (celda1.style.backgroundColor !== "rgb(255, 255, 255)") {
                celda1.style.backgroundColor = "#fff";
            };
        }); 
    };

    

    //use a conditional to change the size of the grid with a min of 1 and a max of 99
    function GridChangeFunction() {
        const USER_INPUT = prompt("Give a number to change the Grid");
        const PARSED_INPUT = parseInt(USER_INPUT);
        if (USER_INPUT != null) {
            if(!isNaN(PARSED_INPUT) && PARSED_INPUT >= 1 && PARSED_INPUT < 100) {
                numberOfSquares = PARSED_INPUT;
                createGrid();
            } else {
                alert("Please enter a valid number greater than or equal 1 and lower than 100");
            };
        }
    };

 

    //Function how respond if user click in the button to reduce the 
    //transparency and viciverse
    function TransparencyButtonClick(event) {
        
        if (event.target === LessTransparencyButton) {
            TransparencyNumber -= 0.10;
        }else if (event.target === MoreTransparencyButton) {
            TransparencyNumber += 0.10;
        };
        return TransparencyNumber;
    };

    //using the methods "round" and "random" in the object math create 
    //a random rgba number
    function randomRGB(alpha) {
        const o = Math.round;
        const r = Math.random;
        const s = 255;
    
        const red = o(r() * s);
        const green = o(r() * s);
        const blue = o(r() * s);
    
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;        
    };

    //Every time the button "clear", "Erase", "Randomize", "Return" is pressed the
    //var "buttonClicked" change according to the button what was pressed to 
    //active the conditional inside this function
    function AddOrDesactiveClass() {
        if(ButtonClicked === "ClearOrReturnToBlackButton") {
            EraserButton.classList.remove("Desactive");
            EraserButton.classList.add("TextChange-back");

            RandomizeButton.classList.remove("Desactive");
            RandomizeButton.classList.add("TextChange-back");

            ReturnToBlackButton.classList.remove("TextChange-back");
            ReturnToBlackButton.classList.add("Desactive");

            DarkerButton.classList.remove("Desactive");
            DarkerButton.classList.add("TextChange-back");

            DarkerActive = "none"

        } else if (ButtonClicked === "EraserButton") {
            EraserButton.classList.remove("TextChange-back");
            EraserButton.classList.add("Desactive");
            ReturnToBlackButton.classList.remove("Desactive");
            ReturnToBlackButton.classList.add("TextChange-back");

            DarkerActive = "none";

        } else if (ButtonClicked === "RandomizeButton") {
            ReturnToBlackButton.classList.add("TextChange-back");
            ReturnToBlackButton.classList.remove("Desactive");

            EraserButton.classList.add("TextChange-back");
            
            RandomizeButton.classList.remove("TextChange-back");
            RandomizeButton.classList.add("Desactive")
            
        } else if (ButtonClicked === "DarkerButton") {
            DarkerButton.classList.remove("TextChange-back")
            DarkerButton.classList.add("Desactive");
            ReturnToBlackButton.classList.add("TextChange-back");
            ReturnToBlackButton.classList.remove("Desactive");
        }
    };

    function DecidePen() {
        if (ColorCase == "Black") {
            Color = `rgba(0,0,0,${TransparencyNumber})`
            } else if (ColorCase == "Eraser") {
                    Color = "#fff"
                } else if (ColorCase == "RainbowColor") {
                        Color = randomRGB(TransparencyNumber);
                    };
        return Color; 
    }
    
    function DarkenCellTransparency(Cell) {
        if (TransparencyLevels[Cell] < 1) {
            TransparencyLevels[Cell] += 0.0125;
        };
    };

    // NO MORE FUNCTIONS!!!! --------------------------------------------


    // Here's logic --------------------------------------------------------


        //Logic of the button "Clear" to clean the grid.
        Clear.addEventListener("click", () => {
            ClearFunction();
            ColorCase = "Black";
            ButtonClicked = "ClearOrReturnToBlackButton";
            AddOrDesactiveClass();
            TransparencyNumber = 1;
        });
        


        // If the user clicks "EraserButton", it sets the ColorCase var
        // set the background of each DivChildGrid to white if the user
        // do a mousedown. Immediately the button changes to a "ColorModeButton"
        // To return to black if the user presses the button again.
        EraserButton.addEventListener("click", () => {
            ColorCase = "Eraser";
            ButtonClicked = "EraserButton";
            AddOrDesactiveClass();
        });




        // the CSS propierties transform and transition to change the 
        // visualition of the button.
        ReturnToBlackButton.addEventListener("click", () => {
            ColorCase = "Black";
            ButtonClicked = "ClearOrReturnToBlackButton";
            TransparencyNumber = 1;
            AddOrDesactiveClass();
        });
        
        // Logic of the button "GridChange" to change the size of the grid.
        GridChange.addEventListener("click", () => {
            GridChangeFunction();
        });
        

        //Logic of the button "randomize button"
        RandomizeButton.addEventListener("click", () => {
            ColorCase = "RainbowColor";
            TransparencyNumber = 1;
            ButtonClicked = "RandomizeButton";
            AddOrDesactiveClass();
        });


        DarkerButton.addEventListener("click", (event) => {
            if(event.target === LessTransparencyButton && TransparencyNumber <= 0.10) {
                alert("The transparency is already 0, you cant substrac anymore.");
            }else if (event.target === MoreTransparencyButton && TransparencyNumber == 1){
                alert("The transparency is 1, you can't add more.")
            }else if(event.target === LessTransparencyButton || event.target === MoreTransparencyButton) {
                TransparencyButtonClick(event);
            };
        });

        DARKER_MODE_CONTAINER.addEventListener("click", () => {
            DarkerActive = "YES";
            AddOrDesactiveClass();
        });

    

    // Mouse movement ---------------------------------------------------

    PARENT.addEventListener("mousedown", () => {
        draw = true;

    });
    PARENT.addEventListener("mouseup", () => {
        draw = false;
    });

    PARENT.addEventListener("mousemove", (event) => {

        if(draw && event.target.classList.contains("divChildGrid")) {
            const Cell = "Cell";

    
            DecidePen();
            event.target.style.backgroundColor = Color;

            if (DarkerActive == "YES") {
                DarkenCellTransparency(Cell);
                event.target.style.backgroundColor = `rgba(0,0,0, ${TransparencyLevels[Cell]})`;
                console.log(TransparencyLevels[Cell]);
            }

        };
            
    });
    


});