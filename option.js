const activecell = document.querySelector(".selected-cell")
const form = document.getElementById("form")
const evaluate = document.getElementById("expression")
let selectedcell = null
const defaultstate = {
    innerText:"",
    isbold:false,
    isitalic:false,
    isunderline:false,
    align: "left",
    textColor:"#000000",
    bgcolor:"#ffffff",
}

const state = {}
function onChangeInnerText(e){
    if(state[selectedcell.id]){
        state[selectedcell.id].innerText = selectedcell.innerText
    }
    else{
        state[selectedcell.id] = {...defaultstate,innerText:selectedcell.innerText}
    }
}

function applyCellInfoToForm(){
    if(state[selectedcell.id]){
        const data = state[selectedcell.id];
        for(let key in data){
            
            if(form[key].type === "checkbox"){
                form[key].checked = data[key];
            }
            else{
                form[key].value = data[key];
            }
        }
    }
    else{
        form.reset();
    }
}

function onFocusCell(e){
    if(selectedcell){
        selectedcell.classList.remove("activecell")
    }
    selectedcell = e.target;
    activecell.innerText = selectedcell.id;

    selectedcell.classList.add("activecell")
    applyCellInfoToForm()

}

function applyStylesToSelectedcell(e){
    selectedcell.style.fontFamily = e.fontFamily
    selectedcell.style.fontSize = e.fontSize + "px"
    selectedcell.style.fontWeight = e.isbold ? "bold":"normal"
    selectedcell.style.fontStyle = e.isitalic ? "italic":"normal"
    selectedcell.style.textDecoration = e.isunderline ? "underline":"normal"
    selectedcell.style.textAlign = e.align
    selectedcell.style.color = e.textColor
    selectedcell.style.backgroundColor = e.bgcolor
}
form.addEventListener("change", () =>{
    if(!selectedcell){
        alert("please Select a cell")
        form.reset()
        return;
    }
    const formdata = {
        fontFamily: form["fontFamily"].value,
        fontSize:form["fontSize"].value,
        isbold:form["isbold"].checked,
        isitalic:form["isitalic"].checked,
        isunderline:form["isunderline"].checked,
        align:form["align"].value,
        textColor:form["textColor"].value,
        bgcolor:form["bgcolor"].value
    };
    // console.log(formdata)
    state[selectedcell.id] = {
        ...formdata,
        innerText:selectedcell.innerText
    };
    applyStylesToSelectedcell(formdata)
})

evaluate.addEventListener("keyup",(e) =>{
    if(e.code === "Enter" && selectedcell){
        let exp = evaluate.innerText
        let result = eval(`${evaluate.value}`)
        selectedcell.innerText = result
    }
})