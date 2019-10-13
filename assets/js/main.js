var boardContainer = document.getElementById("boardContainer")

let table = document.createElement("table")
table.setAttribute("id", "table")

let counter = 0
var arr = []
//heart
// var arrThHorizontal = ["2,1", "4", "4", "4", "2"]
// var arrThVertical = ["1,1,1", "5", "5", "3", "1"]
// var rows = 5
//arrow
// var arrThHorizontal = [ "1","1","5","1","1"]
// var arrThVertical = ["1","3","1,1,1,","1","1"]
// var rows = 5
//umbrella
var arrThHorizontal = ["1","2","2,1","7","2","2","1"]
var arrThVertical = ["1","5","7","1","1","1","2"]
var rows = 7


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
var longest_vertical_element = longestElement(arrThVertical)
let longest_element_vertical = longest_vertical_element.split(",")

//horizontal
var longest_horizontal_element = longestElement(arrThHorizontal)
let longest_element_horizontal = longest_horizontal_element.split(",")

if(longest_element_vertical!=0){
for (let i = 0; i < longest_element_vertical.length; i++) {
    arrThHorizontal.unshift(" ")
}}else{
    arrThHorizontal.unshift(" ") 
}


var cols = 1
if (longest_element_horizontal != 0) {
    cols = longest_element_horizontal.length
}




if(cols != 1){
for (let i = 0; i < cols; i++) {
    let thead_horizontal = document.createElement("thead")
    let tr_horizontal = document.createElement("tr")
    for (let a = 0; a < arrThHorizontal.length; a++) {
        if (arrThHorizontal[a].length > 1) {
            var bigOne = arrThHorizontal[a].split(",")
            var difference_hori = 0
            if (bigOne.length < cols) {
                difference_hori = cols - bigOne.length
                if (i >= difference_hori) {
                    let th_horizontal = document.createElement("th");
                    th_horizontal.setAttribute("id", "thH" + arrThHorizontal[a])
                    th_horizontal.setAttribute("class", "thHorizontal")
                    th_horizontal.innerText = bigOne[i - 1]
                    tr_horizontal.appendChild(th_horizontal)
                } else {
                    let th_horizontal = document.createElement("th");
                    th_horizontal.setAttribute("id", "thH" + arrThHorizontal[a])
                    th_horizontal.setAttribute("class", "thHorizontal")
                    th_horizontal.innerText = " "
                    tr_horizontal.appendChild(th_horizontal)
                }

            } else {
                let th_horizontal = document.createElement("th");
                th_horizontal.setAttribute("id", "thH" + arrThHorizontal[a])
                th_horizontal.setAttribute("class", "thHorizontal")
                th_horizontal.innerText = bigOne[i]
                tr_horizontal.appendChild(th_horizontal)
            }


        } else {
            if (i > 0) {
                let th_horizontal = document.createElement("th");
                th_horizontal.setAttribute("id", "thH" + arrThHorizontal[a])
                th_horizontal.setAttribute("class", "thHorizontal")
                th_horizontal.innerText = arrThHorizontal[a]
                tr_horizontal.appendChild(th_horizontal)
            } else {
                let th_horizontal = document.createElement("th");
                th_horizontal.setAttribute("id", "thH" + arrThHorizontal[a])
                th_horizontal.setAttribute("class", "thHorizontal")
                th_horizontal.innerText = " "
                tr_horizontal.appendChild(th_horizontal)

            }
        }

    }
    
    thead_horizontal.appendChild(tr_horizontal)
    table.appendChild(thead_horizontal)
}
}else{
    let thead_horizontal = document.createElement("thead")
    let tr_horizontal = document.createElement("tr")
    for (let a = 0; a < arrThHorizontal.length; a++) {
        let th_horizontal = document.createElement("th");
        th_horizontal.setAttribute("id", "thH" + arrThHorizontal[a])
        th_horizontal.setAttribute("class", "thHorizontal")
        th_horizontal.innerText = arrThHorizontal[a]
        tr_horizontal.appendChild(th_horizontal) 
    }
    thead_horizontal.appendChild(tr_horizontal)
    table.appendChild(thead_horizontal)
}






function createVerticalHeading(i, col, txt, thVert) {
    // if (col == 0) {
    thVert.setAttribute("id", "thV" + arrThVertical[i])
    thVert.setAttribute("class", "verticalth")
    thVert.innerText = txt
    // } else {
    //     thVert.setAttribute("id", "thV" + arrThVertical[i])
    //     thVert.setAttribute("class", "verticalth")
    //     thVert.innerText = txt
    // }


}


for (let i = 0; i < rows; i++) {
    let row = document.createElement("tr");
    row.setAttribute("id", "row" + i);
    let el_length = arrThVertical[i].split(",");

    if (longest_element_vertical != 0) {
        if (arrThVertical[i].length > 1) {

            let forLength = longest_element_vertical.length

            var diffrence = 0
            if (el_length.length < longest_element_vertical.length) {
                diffrence = longest_element_vertical.length - el_length.length

            }
            for (let z = 0; z < forLength; z++) {
                if (diffrence != 0) {
                    if (z >= diffrence) {
                        let thVert = document.createElement("th");
                        createVerticalHeading(i, 0, el_length[z - 1], thVert)
                        row.appendChild(thVert)
                    } else {
                        let thVert = document.createElement("th");
                        createVerticalHeading(i, 0, " ", thVert)
                        row.appendChild(thVert)
                    }

                } else {

                    let thVert = document.createElement("th");
                    createVerticalHeading(i, 0, el_length[z], thVert)
                    row.appendChild(thVert)
                }
            }
        } else {
            for (let z = 0; z < longest_element_vertical.length - 1; z++) {
                let thVert = document.createElement("th");
                createVerticalHeading(i, 0, " ", thVert)
                row.appendChild(thVert)
            }
            let thVert = document.createElement("th");
            createVerticalHeading(i, longest_element_vertical.length, arrThVertical[i], thVert)
            row.appendChild(thVert)

        }

        for (let j = 0; j < rows; j++) {
            let data = document.createElement("td");
            data.setAttribute("id", i + "x" + j);
            let obj2 = { "id": i + "x" + j, "checkTest": 0 }
            data.innerText = i + "x" + j
            arr.push(obj2)
            // data.innerText="row"+i+"x"+j
            data.addEventListener("click", checkTd);


            row.appendChild(data);

        }


        table.appendChild(row);

    }else{

            let thVert = document.createElement("th");
            createVerticalHeading(i, longest_element_vertical.length, arrThVertical[i], thVert)
            row.appendChild(thVert)
        


        for (let j = 0; j < rows; j++) {
            let data = document.createElement("td");
            data.setAttribute("id", i + "x" + j);
            let obj2 = { "id": i + "x" + j, "checkTest": 0 }
            data.innerText = i + "x" + j
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

    // var indexArr=[2,6,7,8,10,12,14,17,22] //arrows
    //var indexArr = [1, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 22]//heart
    var indexArr = [3,8,9,10,11,12,14,15,16,17,18,19,20,24,31,38,44,45]//umbrella
    //for(let i = 0;i<arr.length;i++){

    if (indexArr.includes(index) && arr[index].checkTest == 1) {
        if (counter == indexArr.length - 1) {
            console.log("WIN !!!")
        }
        counter++
    }

    if (indexArr.includes(index) && arr[index].checkTest == 2) {
        if (counter == indexArr.length - 1) {
            console.log("nops")
        }
        counter--
    }



}