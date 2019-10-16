//game elements
var boardContainer = document.getElementById("boardContainer")
var table = document.createElement("table")
var gameBtns = document.getElementById("gameBtns")

//menu elements
var heading = document.querySelector("h1")
var menu = document.getElementById("menu")

//variables and flags
var hints = []
var arr = []

var nextBtn = ""
var hintBtn = ""
var resetBtn = ""

var level = 0 // level index
var counter = 0 //flag that counts correct answers
var cols = 1 // fixed one column to add an empty " " before the rows of the grid
var btnDisplay = 0 // flag to check if buttons are already displayed (so in next level it wouldn't create them again)

//levels elements
let levels = [
    {
        "arrThHorizontal": ["2", "4", "4", "4", "2"],
        "arrThVertical": ["1,1", "5", "5", "3", "1"],
        "answers": [1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 22], "rows": 5, "shape": "Heart"
    },
    {
        "arrThHorizontal": ["1", "1", "5", "1", "1"], "arrThVertical": ["1", "3", "1,1,1", "1", "1"],
        "answers": [2, 6, 7, 8, 10, 12, 14, 17, 22], "rows": 5, "shape": "Arrow"
    },
    {
        "arrThHorizontal": ["1", "2", "2,1", "7", "2", "2", "1"], "arrThVertical": ["1", "5", "7", "1", "1", "1", "2"],
        "answers": [3, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 24, 31, 38, 44, 45],
        "rows": 7, "shape": "Umbrella"
    }
    // this element is commented because it's too big for the presentation, I'll uncomment it after, so people can play it
    // ,{ 
    //     "arrThHorizontal": ["2", "5", "2,3", "5,1", "4,3", "10", "8,1", "1,5,1", "1,3", "6"],
    //     "arrThVertical": ["4", "3", "5", "7,1", "1,7", "2,1,5", "4,5", "2,4,1", "4,1", "4"],
    //     "answers": [5, 6, 7, 14, 15, 16, 22, 23, 24, 25, 26, 31, 32, 33, 34, 35, 36, 37, 39, 41, 43, 44, 45, 46, 47, 48, 49, 50, 51, 53, 55, 56, 57, 58, 59, 60, 61, 62,
    //         63, 65, 66, 67, 68, 69, 71, 72, 74, 75, 76, 77, 79, 82, 83, 84, 85, 89, 94, 95, 96, 97],
    //     "rows": 10,
    //     "shape": "Fish"
    // }
]

//calling the create menu buttons when first loading the page
createMenuBtns()

//--------------- Grid making functions ---------------// 

//make the grid(table)
function makeGrid() {

    if (level < levels.length) {

        /* if level > level.length btnNextLevel display.None !!!! */

        //vertical 
        var longest_vertical_element = longestElement(levels[level].arrThVertical)
        let longest_element_vertical = longest_vertical_element.split(",")

        //horizontal
        var longest_horizontal_element = longestElement(levels[level].arrThHorizontal)
        let longest_element_horizontal = longest_horizontal_element.split(",")

        //check how many grid columns is there to shift the row accordingly
        if (longest_element_vertical != 0) {
            for (let i = 0; i < longest_element_vertical.length; i++) {
                levels[level].arrThHorizontal.unshift("")
            }
        } else {
            levels[level].arrThHorizontal.unshift("") // if it's only one column just shift it once
        }

        //to see how many rows to make for th
        if (longest_element_horizontal != 0) {
            cols = longest_element_horizontal.length
        }

        //////////////////make the horizontal th //////////////////
        if (cols != 1) {
            for (let i = 0; i < cols; i++) {
                let thead_horizontal = document.createElement("thead")
                let tr_horizontal = document.createElement("tr")
                for (let a = 0; a < levels[level].arrThHorizontal.length; a++) {
                    //if the element has more than one row
                    if (levels[level].arrThHorizontal[a].length > 1 && levels[level].arrThHorizontal[a].includes(",")) {
                        var el_length = levels[level].arrThHorizontal[a].split(",")
                        //check if the element is the longest 
                        if (el_length.length < cols) {
                            if (i >= cols - el_length.length) {
                                let th_horizontal = document.createElement("th");
                                setThAttributes(el_length[i - 1], th_horizontal, "thHorizontal")
                                tr_horizontal.appendChild(th_horizontal)
                            } else {
                                let th_horizontal = document.createElement("th");
                                setThAttributes("", th_horizontal, "thHorizontal")
                                tr_horizontal.appendChild(th_horizontal)
                            }

                        } else {
                            let th_horizontal = document.createElement("th");
                            setThAttributes(el_length[i], th_horizontal, "thHorizontal")
                            tr_horizontal.appendChild(th_horizontal)
                        }


                    } else {
                        if (i >= cols - 1) {
                            let th_horizontal = document.createElement("th");
                            setThAttributes(levels[level].arrThHorizontal[a], th_horizontal, "thHorizontal")
                            tr_horizontal.appendChild(th_horizontal)
                        } else {
                            let th_horizontal = document.createElement("th");
                            setThAttributes("", th_horizontal, "thHorizontal")
                            tr_horizontal.appendChild(th_horizontal)

                        }
                    }

                }

                thead_horizontal.appendChild(tr_horizontal)
                table.appendChild(thead_horizontal)
            }
        } else {
            let thead_horizontal = document.createElement("thead")
            let tr_horizontal = document.createElement("tr")
            for (let a = 0; a < levels[level].arrThHorizontal.length; a++) {
                let th_horizontal = document.createElement("th");
                setThAttributes(levels[level].arrThHorizontal[a], th_horizontal, "thHorizontal")
                tr_horizontal.appendChild(th_horizontal)
            }
            thead_horizontal.appendChild(tr_horizontal)
            table.appendChild(thead_horizontal)
        }

        //////////////////make the vertical th //////////////////
        for (let i = 0; i < levels[level].rows; i++) {
            let row = document.createElement("tr");


            //if there's more than one column
            if (longest_element_vertical != 0) {

                //if it's an element with more than one value
                if (levels[level].arrThVertical[i].length > 1 && levels[level].arrThVertical[i].includes(",")) {
                    var diffrence = 0
                    //check current element length
                    let el_length = levels[level].arrThVertical[i].split(",");
                    if (el_length.length < longest_element_vertical.length) {
                        diffrence = longest_element_vertical.length - el_length.length
                    }
                    for (let z = 0; z < longest_element_vertical.length; z++) {
                        if (diffrence != 0) {
                            if (z >= diffrence) {
                                let thVert = document.createElement("th");
                                setThAttributes(el_length[z - 1], thVert, "verticalth")
                                row.appendChild(thVert)
                            } else {
                                let thVert = document.createElement("th");
                                setThAttributes("", thVert, "verticalth")
                                row.appendChild(thVert)
                            }
                        } else {
                            let thVert = document.createElement("th");
                            setThAttributes(el_length[z], thVert, "verticalth")
                            row.appendChild(thVert)
                        }
                    }
                } else {
                    for (let z = 0; z < longest_element_vertical.length - 1; z++) {
                        let thVert = document.createElement("th");
                        setThAttributes(" ", thVert, "verticalth")
                        row.appendChild(thVert)
                    }
                    let thVert = document.createElement("th");
                    setThAttributes(levels[level].arrThVertical[i], thVert, "verticalth")
                    row.appendChild(thVert)
                }

                //create and append the table cells (the canvas)
                for (let j = 0; j < levels[level].rows; j++) {
                    let data = document.createElement("td");
                    data.setAttribute("id", i + "x" + j);
                    let obj2 = { "id": i + "x" + j, "checkTest": 0 }
                    arr.push(obj2)
                    data.addEventListener("click", changeCell);
                    row.appendChild(data);
                }
                table.appendChild(row);
            } else {
                let thVert = document.createElement("th");
                setThAttributes(levels[level].arrThVertical[i], thVert, "verticalth")
                row.appendChild(thVert)

                if (levels[level].rows == 1) {
                    rows = levels[level].arrThHorizontal.length - 1
                }
                for (let j = 0; j < levels[level].rows; j++) {
                    let data = document.createElement("td");
                    data.setAttribute("id", i + "x" + j);
                    let obj2 = { "id": i + "x" + j, "checkTest": 0 }
                    //data.innerText = i + "x" + j
                    arr.push(obj2)
                    data.addEventListener("click", changeCell);

                    row.appendChild(data);

                }

                table.appendChild(row);
            }
        }

        boardContainer.appendChild(table)

        if (btnDisplay == 0) {
            createGameBtns
                ()
        }

    } else {
        // if it's the last level! 
        gameBtns.innerHTML = " "
        Swal.fire({
            imageUrl: 'assets/img/giphy.gif',
            background: '#e8afbb url(http://www.graphicartsunit.com/images/noise.png)',
            showConfirmButton: false,
            showCloseButton: true,
            title: "Thanks for playing, you've won all the levels"
        })
        heading.style.display = "block"
        menu.style.display = "block"
    }
}/// end of function 

//check for the longest element in the array
function longestElement(array) {
    var element = " "
    for (let i = 0; i < array.length; i++) {
        if (array[i].length > element.length && array[i].includes(",")) {
            element = array[i]
        }
    }
    return element
}

//setting the attribute, I should use this for horizontal too but add the class and the Id I want!
function setThAttributes(txt, th, classes) {
    th.setAttribute("class", classes)
    th.innerText = txt
}

//clearing the boardContainer div and the playr's array to start next level with a new tble
function clearGrid() {
    boardContainer.innerHTML = " "
    table.innerHTML = " "

    counter = 0
    arr = []
    hints = []
    hintBtn.innerText = "Hint " + 3
    cols = 1
    table = document.createElement("table")
    nextBtn.style.display = "none"

    //remove the empty elements in the horizontal object array
    for (let j = 0; j < levels.length; j++) {
        for (let i = 0; i < levels[j].arrThHorizontal.length; i++) {
            levels[j].arrThHorizontal.forEach(function (item, index) {
                if (levels[j].arrThHorizontal[index] == "") {
                    levels[j].arrThHorizontal.splice(index, 1)
                }

            })
        }
    }

}

//--------------- game manipulation/testing functions ---------------// 

//changes the table cells color/symbol
function changeCell() {

    var elementPos = arr.map(function (x) { return x.id; }).indexOf(this.id);
    var objectFound = arr[elementPos];

    this.innerText = " "

    if (objectFound.checkTest == 0) {
        this.style.backgroundColor = "darkslategrey";
        arr[elementPos].checkTest = 1;
    } else if (objectFound.checkTest == 1) {
        this.style.backgroundColor = "white";
        this.innerText = "X"
        arr[elementPos].checkTest = 2
    } else if (objectFound.checkTest == 2) {
        this.style.backgroundColor = "white";
        arr[elementPos].checkTest = 0
    }

    test(elementPos)

}

//check if the player wined or not 
function test(index) {

    if (levels[level].answers.includes(index) && arr[index].checkTest == 1) {
        counter++
        if (counter == levels[level].answers.length) {
            win()
        }
    }

    if (levels[level].answers.includes(index) && arr[index].checkTest == 2) {
        counter--
    }

    if (counter == levels[level].answers.length) {
        win()
    }

}

//check if player won
function win(){
    var check_arr = 0
        for (let i = 0; i < arr.length; i++) {
            if (!(levels[level].answers.includes(i)) && arr[i].checkTest == 1) {
                check_arr = 1
            }
        }
        if (check_arr == 0) {
            nextBtn.style.display = "inline"
            resetBtn.removeEventListener("click", reset)
            hintBtn.removeEventListener("click",flickerHint)
            
            for (let i = 0; i < arr.length; i++) {
                let data = document.getElementById(arr[i].id);
                data.removeEventListener("click", changeCell)
            }

            Swal.fire({
                background: '#e8afbb url(http://www.graphicartsunit.com/images/noise.png)',
                imageUrl: 'assets/img/' + level + '.png',
                imageWidth: 300,
                showConfirmButton: false,
                showCloseButton: true,
                title: levels[level].shape,
                customClass: {
                    popup: 'format-pre'
                }
            })
        }
}

//--------------- Buttons functions ---------------// 

//create the landing page buttons
function createMenuBtns() {
    //Menu Buttons
    var btnInst = document.createElement("a")
    var btnStart = document.createElement("a")
    btnInst.setAttribute("id", "btnInst")
    btnInst.innerText = "Game Instructions"
    btnInst.setAttribute("class", "btn")
    btnInst.setAttribute("href", "#")

    //start game button
    btnStart.setAttribute("id", "btnStart")
    btnStart.setAttribute("class", "btn")
    btnStart.setAttribute("href", "#")
    btnStart.innerText = "Start Game"
    menu.appendChild(btnStart)
    menu.appendChild(btnInst)

    btnStart.addEventListener("click", function () {
        heading.style.display = "none"
        counter = 0
        level = 0
        menu.style.display = "none"
        boardContainer.style.display = "block"
        gameBtns.style.display = "block"
        makeGrid()
    })

    //instruction button
    btnInst.addEventListener("click", function () {

        Swal.fire({
            background: '#e8afbb url(http://www.graphicartsunit.com/images/noise.png)',
            imageUrl: 'assets/img/nonogrampic.png',
            imageWidth: 400,
            showConfirmButton: false,
            showCloseButton: true,
            html: "<p id='swal-text'>Nonogram is a puzzle game in which you fill in pixels based on the values along side the grid" +
                " to complete a picture, you should click once to mark the correct cell and twice for an 'X' symbol to ilemenate the cell" +
                "<br> Also you have 3 hints you can use for each level</p>"
        })
    })
}

//create the buttons under the grid
function createGameBtns() {
    btnDisplay = 1
    // reset button
    resetBtn = document.createElement("a")
    resetBtn.setAttribute("href", "#")
    resetBtn.setAttribute("class", "btn")
    resetBtn.innerText = "Reset"
    gameBtns.appendChild(resetBtn)

    //back to menu button
    var menuBtn = document.createElement("a")
    menuBtn.setAttribute("href", "#")
    menuBtn.setAttribute("class", "btn")
    menuBtn.innerText = "Menu"
    menuBtn.addEventListener("click", function () {
        clearGrid()
        menu.style.display = "block"
        gameBtns.style.display = "none"
        heading.style.display = "block"
    })
    gameBtns.appendChild(menuBtn)
    //hint button
    hintBtn = document.createElement("a")
    hintBtn.setAttribute("href", "#")
    hintBtn.setAttribute("class", "btn")
    hintBtn.innerText = "Hint " + 3
    
    gameBtns.appendChild(hintBtn)
    //next level button
    nextBtn = document.createElement("a")
    nextBtn.setAttribute("href", "#")
    nextBtn.setAttribute("class", "btn")
    nextBtn.innerText = "Next"
    nextBtn.style.display = "none"
    nextBtn.addEventListener("click", function () {
        level += 1
        setBtnsEventsListener()
        clearGrid()
        makeGrid()
    })
    gameBtns.appendChild(nextBtn)
}

//function to set the buttons with their event listener after removing them from win
function setBtnsEventsListener(){
    resetBtn.addEventListener("click", reset)
    hintBtn.addEventListener("click", flickerHint)   
}
//reset buton function
function reset() {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].checkTest != 0) {
            arr[i].checkTest = 0
            let data = document.getElementById(arr[i].id)
            data.style.backgroundColor = "white"
            counter = 0
        }
    }
}
//hint button function
function flickerHint() {
    if (hints.length < 3) {
        let randomNum = Math.floor(Math.random() * arr.length)
        var flash_flag = 0;

        var con1 = (arr[randomNum].checkTest == 0 || arr[randomNum].checkTest == 2) && (levels[level].answers.includes(randomNum))
        var con2 = arr[randomNum].checkTest == 1 && !(levels[level].answers.includes(randomNum))
        let data;

        while (flash_flag == 0) {
            if ((con1 == true || con2 == true) && !(hints.includes(randomNum))) {
                data = document.getElementById(arr[randomNum].id)
                hints.push(randomNum)
                hintBtn.innerText = "Hint " + (3 - hints.length)
                flash_flag = 1
            } else {
                randomNum = Math.floor(Math.random() * arr.length)
                con1 = (arr[randomNum].checkTest == 0 || arr[randomNum].checkTest == 2) && (levels[level].answers.includes(randomNum))
                con2 = arr[randomNum].checkTest == 1 && !(levels[level].answers.includes(randomNum))
            }
        }
        data.classList.add('animated', 'flash');
        if (levels[level].answers.includes(randomNum)) {
            data.style.background = "darkslategrey"
            arr[randomNum].checkTest = 1;
            test(randomNum)
        } else {
            data.style.background = "white"
            data.innerText = "X"
            arr[randomNum].checkTest = 2;
            test(randomNum)
        }
    }
}
