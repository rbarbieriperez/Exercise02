'use strict'

//CONST
const _DELETEBTN_ = document.getElementById("deletebtn");


//FORM VARIABLES
const filmDelete = document.createElement("button");


window.addEventListener('load', () => {
    _DELETEBTN_.addEventListener ("click", () =>{
        DeleteFormOfHTML();
        if (CheckIfListIsEmpty()){
            if (form == null){
                CreateDeleteForm();
            } else {
                DeleteFormOfHTML();
            }
        } else {
            alert("¡There are no elements in the table to be deleted!");
        }
        

    });

    filmDelete.addEventListener("click", () =>{
        DeleteElementFromList();
    });

});




const CreateDeleteForm = function () {

    //Form
    form = document.createElement("form");
    form.setAttribute("onsubmit", "return false;");
    form.style.position ="relative";
    form.style.top = "100px";
    form.style.width = "200px";
    form.style.height = "200px";
    form.style.border = "solid 1px black";
    var br = document.createElement("br");

    //Append all the elements to the form

    form.appendChild(createFilmNameInput());
    form.appendChild(br);
    form.appendChild(createDeleteButton());

    //Append the form to the section and the section to the body
    
    _body_[0].appendChild(createFormSection().appendChild(form));

}

const SearchElementIndex = function (element){
    var index = 0;
    var row = _table_[0].querySelectorAll("tr");
    for (var i = 1; i < row.length; i++){
        if (row[i].cells[0].innerHTML === element){
            index = i;
        }
    }
    if (index === 0){
        alert("There is no film with name: "+element);
    } else {
        return index;
    }
}   

const DeleteElementFromList = function(){
    if (CheckNoEmpty([filmName.value],["Film's Name"])){
        if (SearchElementIndex(filmName.value) > 0){
            var row = _table_[0].querySelectorAll("tr");
            _table_[0].removeChild(row[SearchElementIndex(filmName.value)]);
            alert("¡Film deleted successfully!");
            if (!CheckIfListIsEmpty()){
                alert("¡There are no elements in the table to be deleted!");
                ResetForm([filmName]);
                DeleteFormOfHTML();
            }
        }
    }
}

const createDeleteButton = function() {
    filmDelete.innerText = "Delete";
    filmDelete.setAttribute("name", "Delete");
    filmDelete.style.width = "200px";
    filmDelete.style.height = "30px";
    filmDelete.style.color= "black";
    filmDelete.style.position = "relative";
    filmDelete.style.top = "80px";
    return filmDelete;
}

const CheckIfListIsEmpty = function() {
    var row = _table_[0].querySelectorAll("tr");
    if (row.length > 1){
        return true;
    } else {
        return false;
    }
}