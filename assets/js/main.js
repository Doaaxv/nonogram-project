var boardContainer = document.getElementById("boardContainer")

let table = document.createElement("table")
table.setAttribute("id","table")

let counter = 0
var arr = []
let arrThHorizontal = [" ",2,4,4,4,2]
let arrThVertical = ["1,1","5","5","3","1"]

//make a the table head
let thead_horizontal = document.createElement("thead")
let tr_horizontal = document.createElement("tr")
for(let a=0;a<6;a++){
    let th_horizontal = document.createElement("th");
    th_horizontal.setAttribute("id","thH"+arrThHorizontal[a])
    th_horizontal.setAttribute("class","thHorizontal")
    th_horizontal.innerText = arrThHorizontal[a]
    tr_horizontal.appendChild(th_horizontal)
}
thead_horizontal.appendChild(tr_horizontal)
table.appendChild(thead_horizontal)


boardContainer.appendChild(table)

let col_num = 1
for(let i=0;i<arrThVertical.length;i++){
    if(arrThVertical[i].includes(",")){
        col_num = 2;
        break
    }
}


//let arrThVertical = ["1,1","5","5","3","1"]
for(let i=0;i<2;i++){
let thead_vertical = document.createElement("thead")
let tr_vertical = document.createElement("tr")
for(let j=0;j<5;j++){
    if(arrThVertical[j].length>1){
        
    }
    let th_vertical = document.createElement("th");
     th_vertical.setAttribute("id","row"+j);
     th_horizontal.setAttribute("id","thH"+arrThHorizontal[a])
     th_horizontal.setAttribute("class","thHorizontal")
     th_horizontal.innerText = arrThHorizontal[a]
     tr_horizontal.appendChild(th_horizontal)





}

}


