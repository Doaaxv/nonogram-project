var boardContainer = document.getElementById("boardContainer")
var menu = document.getElementById("menu")

var table = document.createElement("table")
table.setAttribute("id", "table")

var counter = 0
var arr = []
var level = 0


let levels = [{"arrThHorizontal":["2", "4", "4", "4", "2"],
"arrThVertical":["1,1", "5", "5", "3", "1"],
"answers":[1, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 22],"rows":5,"shape":"Heart"},
{"arrThHorizontal":[ "1","1","5","1","1"],"arrThVertical": ["1","3","1,1,1,","1","1"],
"answers":[2,6,7,8,10,12,14,17,22],"rows":5,"shape":"arrow"},
{"arrThHorizontal": ["1", "2", "2,1", "7", "2", "2", "1"],"arrThVertical":["1", "5", "7", "1", "1", "1", "2"],
"answers":[3, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 24, 31, 38, 44, 45],
"rows":7,"shape":"umbrella"}]


function makeGrid(){
    boardContainer.innerHTML = " "

}


function longestElement(array) {
    var element = " "
    for (let i = 0; i < array.length; i++) {
        if (array[i].length > element.length) {
            element = array[i]
        }
    }

    return element
}

//vertical 
var longest_vertical_element = longestElement(levels[level].arrThVertical)
let longest_element_vertical = longest_vertical_element.split(",")

//horizontal
var longest_horizontal_element = longestElement(levels[level].arrThHorizontal)
let longest_element_horizontal = longest_horizontal_element.split(",")

if (longest_element_vertical != 0) {
    for (let i = 0; i < longest_element_vertical.length; i++) {
        levels[level].arrThHorizontal.unshift(" ")
    }
} else {
    levels[level].arrThHorizontal.unshift(" ")
}


var cols = 1
if (longest_element_horizontal != 0) {
    cols = longest_element_horizontal.length
}




if (cols != 1) {
    for (let i = 0; i < cols; i++) {
        let thead_horizontal = document.createElement("thead")
        let tr_horizontal = document.createElement("tr")
        for (let a = 0; a < levels[level].arrThHorizontal.length; a++) {
            if (levels[level].arrThHorizontal[a].length > 1) {
                var bigOne = levels[level].arrThHorizontal[a].split(",")
                var difference_hori = 0
                if (bigOne.length < cols) {
                    difference_hori = cols - bigOne.length
                    if (i >= difference_hori) {
                        let th_horizontal = document.createElement("th");
                        th_horizontal.setAttribute("id", "thH" + levels[level].arrThHorizontal[a])
                        th_horizontal.setAttribute("class", "thHorizontal")
                        th_horizontal.innerText = bigOne[i - 1]
                        tr_horizontal.appendChild(th_horizontal)
                    } else {
                        let th_horizontal = document.createElement("th");
                        th_horizontal.setAttribute("id", "thH" + levels[level].arrThHorizontal[a])
                        th_horizontal.setAttribute("class", "thHorizontal")
                        th_horizontal.innerText = " "
                        tr_horizontal.appendChild(th_horizontal)
                    }

                } else {
                    let th_horizontal = document.createElement("th");
                    th_horizontal.setAttribute("id", "thH" + levels[level].arrThHorizontal[a])
                    th_horizontal.setAttribute("class", "thHorizontal")
                    th_horizontal.innerText = bigOne[i]
                    tr_horizontal.appendChild(th_horizontal)
                }


            } else {
                if (i > 0) {
                    let th_horizontal = document.createElement("th");
                    th_horizontal.setAttribute("id", "thH" + levels[level].arrThHorizontal[a])
                    th_horizontal.setAttribute("class", "thHorizontal")
                    th_horizontal.innerText = levels[level].arrThHorizontal[a]
                    tr_horizontal.appendChild(th_horizontal)
                } else {
                    let th_horizontal = document.createElement("th");
                    th_horizontal.setAttribute("id", "thH" + levels[level].arrThHorizontal[a])
                    th_horizontal.setAttribute("class", "thHorizontal")
                    th_horizontal.innerText = " "
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
        th_horizontal.setAttribute("id", "thH" + levels[level].arrThHorizontal[a])
        th_horizontal.setAttribute("class", "thHorizontal")
        th_horizontal.innerText = levels[level].arrThHorizontal[a]
        tr_horizontal.appendChild(th_horizontal)
    }
    thead_horizontal.appendChild(tr_horizontal)
    table.appendChild(thead_horizontal)
}




function createVerticalHeading(i, txt, thVert) {
    thVert.setAttribute("id", "thV" + levels[level].arrThVertical[i])
    thVert.setAttribute("class", "verticalth")
    thVert.innerText = txt

}


for (let i = 0; i < levels[level].rows; i++) {
    let row = document.createElement("tr");
    row.setAttribute("id", "row" + i);
    let el_length = levels[level].arrThVertical[i].split(",");
    

    if (longest_element_vertical != 0) {
        if (levels[level].arrThVertical[i].length > 1) {

            let forLength = longest_element_vertical.length

            var diffrence = 0
            if (el_length.length < longest_element_vertical.length) {
                diffrence = longest_element_vertical.length - el_length.length

            }
            for (let z = 0; z < forLength; z++) {
                if (diffrence != 0) {
                    if (z >= diffrence) {
                        let thVert = document.createElement("th");
                        createVerticalHeading(i,el_length[z - 1], thVert)
                        row.appendChild(thVert)
                    } else {
                        let thVert = document.createElement("th");
                        createVerticalHeading(i," ", thVert)
                        row.appendChild(thVert)
                    }

                } else {

                    let thVert = document.createElement("th");
                    createVerticalHeading(i,el_length[z], thVert)
                    row.appendChild(thVert)
                }
            }
        } else {
            for (let z = 0; z < longest_element_vertical.length - 1; z++) {
                let thVert = document.createElement("th");
                createVerticalHeading(i," ", thVert)
                row.appendChild(thVert)
            }
            let thVert = document.createElement("th");
            createVerticalHeading(i, levels[level].arrThVertical[i], thVert)
            row.appendChild(thVert)

        }

        for (let j = 0; j < levels[level].rows; j++) {
            let data = document.createElement("td");
            data.setAttribute("id", i + "x" + j);
            let obj2 = { "id": i + "x" + j, "checkTest": 0 }
            // data.innerText = i + "x" + j
            arr.push(obj2)
            // data.innerText="row"+i+"x"+j
            data.addEventListener("click", checkTd);


            row.appendChild(data);

        }


        table.appendChild(row);

    } else {

        let thVert = document.createElement("th");
        createVerticalHeading(i,levels[level].arrThVertical[i], thVert)
        row.appendChild(thVert)



        for (let j = 0; j < levels[level].rows; j++) {
            let data = document.createElement("td");
            data.setAttribute("id", i + "x" + j);
            let obj2 = { "id": i + "x" + j, "checkTest": 0 }
            //data.innerText = i + "x" + j
            arr.push(obj2)
            // data.innerText="row"+i+"x"+j
            data.addEventListener("click", checkTd);


            row.appendChild(data);

        }


        table.appendChild(row);

    }
}

boardContainer.appendChild(table)





function checkTd() {


    var elementPos = arr.map(function (x) { return x.id; }).indexOf(this.id);
    var objectFound = arr[elementPos];

    if (objectFound.checkTest == 0) {
        this.style.backgroundColor = "blue";
        arr[elementPos].checkTest = 1;
    } else if (objectFound.checkTest == 1) {
        this.style.backgroundColor = "yellow";
        arr[elementPos].checkTest = 2
    } else if (objectFound.checkTest == 2) {
        this.style.backgroundColor = "white";
        arr[elementPos].checkTest = 0
    }

    test(elementPos)

}

function test(index) {


    if (levels[level].answers.includes(index) && arr[index].checkTest == 1) {
        if (counter == levels[level].answers.length - 1) {
            console.log("WIN !!!")
            nextBtn.style.display = "block"
            level +=1
        }
        counter++
    }

    if (levels[level].answers.includes(index) && arr[index].checkTest == 2) {
        if (counter == levels[level].answers.length - 1) {
            console.log("nops")
        }
        counter--
    }



}

///////////////////////Buttons ////////////////////////////
var btnInst = document.createElement("button")
btnInst.setAttribute("id","btnInst")
btnInst.innerText = "Game Instructions"

 //document.getElementById("btnInst")

/////////////////////// start game button /////////////////////// 
let btnStart = document.createElement("button")
btnStart.setAttribute("id","btnStart")
btnStart.innerText="Start Game"
menu.appendChild(btnStart)
menu.appendChild(btnInst)
//document.getElementById("btnStart")

 btnStart.addEventListener("click",function(){
    counter = 0
    level = 0
    menu.style.display = "none"
    boardContainer.style.display="block"
})

/////////////////////// instruction button /////////////////////// 
let $modaBody = document.querySelector(".model-body")
let $model = document.getElementById("myModal");
btnInst.addEventListener("click", function () {

    let $close = document.querySelector(".close")


    let htmlContent = " <p> Nonogram, also known as Picross or Griddlers,"+
    " is a puzzle game in which you fill in pixels to complete a picture.</p> "

    htmlContent += "<img src ='assets/img/nonogrampic.png' />"

    $modaBody.innerHTML = htmlContent;
    $model.style.display = "block"
    $close.addEventListener("click", function () {
        $model.style.display = "none"
    });


})
/////////////////////// reset button ////////////////
var resetBtn = document.createElement("button")
resetBtn.innerText = "Reset"
resetBtn.addEventListener("click",function(){
    for(let i=0;i<arr.length;i++){
        if(arr[i].checkTest!= 0){
            arr[i].checkTest= 0
            let data = document.getElementById(arr[i].id)
            data.style.backgroundColor = "white"
            counter = 0

        }
    }
    
})

boardContainer.appendChild(resetBtn)
/////////////////////// back to menu button ////////////////
var menuBtn = document.createElement("button")
menuBtn.innerText = "Menu"
menuBtn.addEventListener("click",function(){
    menu.style.display = "block"
    boardContainer.style.display="none"
    
})
boardContainer.appendChild(menuBtn)
/////////////////////// next level button ////////////////
var nextBtn = document.createElement("button")
nextBtn.innerText = "Next level"
nextBtn.style.display = "none"
nextBtn.addEventListener("click",function(){
    level = 1
    makeGrid()
})
boardContainer.appendChild(nextBtn)
