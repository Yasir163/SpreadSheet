const headrow = document.getElementById("head-row")
const sno = document.getElementById("sno")
const body = document.getElementById("body")
const plate = document.getElementById("plate")

const row = 100;
const col = 26;

for(let i = 1; i<= col;i++ ){
    const headcell = document.createElement("div")
    headcell.className = "callhead"
    headcell.innerText = String.fromCharCode(i + 64)
    headrow.appendChild(headcell)
}
for (let i=0; i<row; i++){
    const snocell = document.createElement("div")
    snocell.className = "sno-cell"
    snocell.innerText = i + 1;
    sno.appendChild(snocell)
}

for(let i=1; i<=row;i++){
    const rowcell = document.createElement("div")
    rowcell.className = "row"
    for(let j=1; j<=col; j++){
        const colcell = document.createElement("div")
        colcell.className = "cell"
        colcell.contentEditable = true
        colcell.id = `${String.fromCharCode(j + 64)}${i}`
        colcell.addEventListener("input",onChangeInnerText)
        colcell.addEventListener("focus",onFocusCell)
        rowcell.appendChild(colcell)
    }
    body.appendChild(rowcell)
}