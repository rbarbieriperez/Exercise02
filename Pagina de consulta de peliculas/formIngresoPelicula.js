'use strict'

//Variables

//Const
const _crearbtn_ = document.getElementById('crearbtn');
const _body_ = document.getElementsByTagName('body');
const _table_ = document.getElementsByTagName('table');
var form = null;

//Form elements
const filmName = document.createElement("input");
const filmYear = document.createElement("input");
const filmDuration = document.createElement("input");
const filmSubmit = document.createElement("button");



window.addEventListener("load", () =>{
    _crearbtn_.addEventListener ("click", () =>{
        if (_body_[0].querySelectorAll("body > form").length === 0){
            CreateForm();
        } else {
            DeleteFormOfHTML();
        }

    });

    filmSubmit.addEventListener("click", () =>{
        CollectData();
    });


});

//Functions
// Form related
const DeleteFormOfHTML = function(){
    var bodyContent = _body_[0].querySelectorAll("body > form");
    if (bodyContent.length > 0){
        _body_[0].removeChild(form);
    }
    form = null;
    
}

const CreateForm = function () {

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
    form.appendChild(createFilmYearInput());
    form.appendChild(br);
    form.appendChild(createFilmDurationInput());
    form.appendChild(br);
    form.appendChild(createFilmSubmitButton());

    //Append the form to the section and the section to the body
    
    _body_[0].appendChild(createFormSection().appendChild(form));

}

const createFilmNameInput = function(){
    //Film's name
    
    filmName.setAttribute('type', 'text');
    filmName.setAttribute('placeholder',"Film's Name");
    filmName.setAttribute('name','filmName');
    filmName.style.position = "relative";
    filmName.style.left = "10px";
    filmName.style.top = "20px";
    return filmName;
}

const createFilmYearInput = function(){
    
    //Year
    
    filmYear.setAttribute("type", "text");
    filmYear.style.position = "relative";
    filmYear.style.top = "30px";
    filmYear.style.left = "10px";
    filmYear.setAttribute("placeholder", "Year")
    filmYear.setAttribute("name","filmYear");    
    return filmYear;
}

const createFilmDurationInput = function(){
    //Duration

    filmDuration.style.position = "relative";
    filmDuration.style.top = "40px";
    filmDuration.style.left = "10px";
    filmDuration.setAttribute("type", "text");
    filmDuration.setAttribute("placeholder","Duration in minutes");
    filmDuration.setAttribute("name", "filmDuration");
    return filmDuration;
}

const createFilmSubmitButton = function(){
    //Submit

    filmSubmit.innerText = "Submit";
    filmSubmit.setAttribute("name", "Submit");
    filmSubmit.style.width = "200px";
    filmSubmit.style.height = "30px";
    filmSubmit.style.color= "black";
    filmSubmit.style.position = "relative";
    filmSubmit.style.top = "80px";
    return filmSubmit;
}
const createFormSection = function(){

    //createFormSection
    var section = document.createElement("section");
    section.style.backgroundColor = "red";
    return section;
}

const ResetForm = function(ElementList){
    for (var i = 0; i < ElementList.length; i++){
        ElementList[i].value = "";
    }
}

//Data related

const CollectData = function(){
    //Save the data to the array
    if (CheckNoEmpty([filmName.value,filmYear.value,filmDuration.value],["Film's Name","Film's Year","Film's Duration"]) && CheckIsOnlyNumbers([filmYear.value, filmDuration.value], ["Film's Year", "Film's Duration"]) && CheckIsOnTable(filmName.value)){ 
        AddElementToTable(filmName.value,filmYear.value,filmDuration.value);
        ResetForm([filmName,filmYear,filmDuration]);
    } 
}


const CheckNoEmpty = function(inputValue, inputName){
    var contador = 0;
    var message = "The following fields have errors:"+"\n"+"\n";
    for (var i = 0; i < inputValue.length; i++){
        if (inputValue[i].length !== 0){
            contador++;
        } else {
            message = message + "- ¡The field "+inputName[i]+" cannot be empty!" + "\n";
        }
    }
    if (contador === inputValue.length){
        return true;
    } else {
        alert(message);
        return false;
    }
}

const CheckIsOnlyNumbers = function(inputValue, inputName){
    var contador = 0;
    var message = "The following fields have errors:"+"\n"+"\n";
    for (var i = 0; i < inputValue.length; i++){
        if (isNaN(inputValue[i]) == false){
            contador++;
        } else {
            message = message + "- ¡The field "+inputName[i]+" only admits numbers!" + "\n";
        }
    }
    if (contador === inputValue.length){
        return true;
    } else {
        alert(message);
        return false;
    }
}

const CheckIsOnTable = function(value){
    var row = _table_[0].querySelectorAll("tr");
    var contador = 1;
    if (row.length > 1){
        for (var i = 1; i < row.length; i++){
            if (row[i].cells[0].innerHTML !== value){
                contador++;
            } 
        }
        if (contador === row.length){
            return true;
        } else{
            alert("¡The film is already in the table!");
            return false;
        }
    } else {
        return true;
    }
}

//Table Related 

const AddElementToTable = function(FilmName,FilmYear,FilmDuration){
    var row = document.createElement("tr");
    //Create new Cells
    var FilmNameCell = document.createElement("td");
    var FilmYearCell = document.createElement("td");
    var FilmDurationCell = document.createElement("td");
    
    //Create new text values

    var FilmNameCellText = document.createTextNode(FilmName);
    var FilmYearCellText = document.createTextNode(FilmYear);
    var FilmDurationCellText = document.createTextNode(FilmDuration + " " + "min");

    //Append the text to the Cells

    FilmNameCell.appendChild(FilmNameCellText);
    FilmYearCell.appendChild( FilmYearCellText);
    FilmDurationCell.appendChild(FilmDurationCellText);

    //Append the cells to the row

    row.appendChild(FilmNameCell);
    row.appendChild(FilmYearCell);
    row.appendChild(FilmDurationCell);

    //Append the row to the Table

    _table_[0].appendChild(row);
}