var boardContainer = document.getElementById("boardContainer")

let table = document.createElement("table")
table.setAttribute("id", "table")

let counter = 0
var arr = []
let arrThHorizontal = ["", " ", 2, 4, 4, 4, 2]
let arrThVertical = ["1,1", "5", "5", "3", "1"]

//make a the table head
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


var long_element = " " 


for (let i = 0; i < arrThVertical.length; i++) {
    console.log(arrThVertical[i].length)
    if (arrThVertical[i].length > long_element.length) {
        console.log(" HERE")
        long_element = arrThVertical[i]
        long_element_length = arrThVertical[i].length
    }
}


let longest_element = long_element.split(",")
console.log("lon_el_size" + longest_element.length)

function createVerticalHeading(i, col, txt, thVert) {
    if (col == 0) {
        thVert.setAttribute("id", "thV" + arrThVertical[i])
        thVert.setAttribute("class", "verticalth")
        thVert.innerText = txt
    } else {
        thVert.setAttribute("id", "thV" + arrThVertical[i])
        thVert.setAttribute("class", "verticalth")
        thVert.innerText = txt
    }


}


for (let i = 0; i < 5; i++) {
    let row = document.createElement("tr");
    row.setAttribute("id", "row" + i);
    let el_length = arrThVertical[i].split(",");
    let el_len = 0
    
    if (longest_element != 0) {
        for (let z = 0; z < longest_element.length; z++) {
            if (arrThVertical[i].length > 1) {
                if (el_length.length < longest_element.length) {
                    if (z == 0) {
                        let thVert = document.createElement("th");
                        createVerticalHeading(i, 0, " ", thVert)
                        row.appendChild(thVert)
                    } else {
                        let thVert = document.createElement("th");
                        createVerticalHeading(i, 0, el_length[el_len], thVert)
                        row.appendChild(thVert)
                        el_len++
                    }
                } else {
                    let thVert = document.createElement("th");
                    createVerticalHeading(i, 0, el_length[z], thVert)
                    row.appendChild(thVert)
                }
            } else {
                if (z == longest_element.length - 1) {
                    let thVert = document.createElement("th");
                    createVerticalHeading(i, longest_element, arrThVertical[i], thVert)
                    row.appendChild(thVert)
                } else {
                    let thVert = document.createElement("th");
                    createVerticalHeading(i, longest_element, " ", thVert)
                    row.appendChild(thVert)
                }
            }

        }
    } else {
        let thVert = document.createElement("th");
        createVerticalHeading(i, longest_element.length, arrThVertical[i], thVert)
        row.appendChild(thVert)

    }

    for (let j = 0; j < 5; j++) {

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

boardContainer.appendChild(table)



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

    console.log(arr)
}

function test(index) {
    //   var answers =[  {"id": "0x0", "checkTest": 0},
    //  {"id": "0x1", "checkTest": 0},
    // {"id": "0x2", "checkTest": 1},
    //  {"id": "0x3", "checkTest": 0},
    //  {"id": "0x4", "checkTest": 0},
    //  {"id": "1x0", "checkTest": 0},
    //  {"id": "1x1", "checkTest": 1},{"id": "1x2", "checkTest": 1},
    //  {"id": "1x3", "checkTest": 1},
    //  {"id": "1x4", "checkTest": 0},
    //  {"id": "2x0", "checkTest": 1},
    // {"id": "2x1", "checkTest": 0},
    // {"id": "2x2", "checkTest": 1},
    // {"id": "2x3", "checkTest": 0},
    // {"id": "2x4", "checkTest": 1},
    // {"id": "3x0", "checkTest": 0},
    // {"id": "3x1", "checkTest": 0},
    // {"id": "3x2", "checkTest": 1},
    // {"id": "3x3", "checkTest": 0},
    // {"id": "3x4", "checkTest": 0},
    // {"id": "4x0", "checkTest": 0},
    // {"id": "4x1", "checkTest": 0},
    // {"id": "4x2", "checkTest": 1},
    // {"id": "4x3", "checkTest": 0},
    // {"id": "4x4", "checkTest": 0}]


    // for(let i=0;i<answers.length;i++){

    //     if(answers[i]!=arr[i]){
    //         console.log("")
    //     }

    // }


    // var indexArr=[2,6,7,8,10,12,14,17,22]

    // for(let i = 0;i<arr.length;i++){

    //     if(indexArr.includes(i)){
    //         console.log("YES")
    //     }

    // }


    //     if(JSON.stringify(answers) == JSON.stringify(arr) ){
    //         console.log("YOU WIN !!!!!!")
    //     }else{
    //         console.log("Just another test")
    //     }




    // var indexArr=[2,6,7,8,10,12,14,17,22]
    var indexArr = [1, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 22]

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

    //}



    console.log("counter is : " + counter)


}