 // to do list elements
 const toDoListEl = document.getElementsByClassName("to-do-tasks")[0];
 const inputAddToDoEl = document.getElementById("add-to-do-task");
 // in progress list elements
 const inProgressListEl = document.getElementsByClassName("in-progress-tasks")[0];
 const inputAddInProgressEl = document.getElementById("add-in-progress-task");
 // done list elements
 const doneListEl = document.getElementsByClassName("done-tasks")[0];
 const inputAddDoneEl = document.getElementById("add-done-task");
 // if is the first time of the user 
if(!JSON.parse(localStorage.getItem("tasks")))
{
    localStorage.setItem("tasks" ,`{"todo": [],"in-progress": [],"done": []}` );
} 
    
    // put the data from the local storage in the lists when refresh
    function addLocalStorageToDom(storageList , domList){
        for(let i = storageList.length -1; i >=0; i-- )
        {
            let liEl = document.createElement("li");
            liEl.setAttribute("class", "task");
            liEl.setAttribute("draggable" , "true");// for the drag and drop
            liEl.innerText = storageList[i];
            domList.insertBefore(liEl, domList.firstChild);
        }
    }
    let toDoStorage = JSON.parse(localStorage.getItem("tasks")).todo;
    let inProgressStorage = JSON.parse(localStorage.getItem("tasks"))["in-progress"];
    let doneStorage = JSON.parse(localStorage.getItem("tasks")).done;
    let localStorageObj = {"todo": toDoStorage,"in-progress": inProgressStorage,"done": doneStorage}
    addLocalStorageToDom(toDoStorage , toDoListEl);
    addLocalStorageToDom(inProgressStorage , inProgressListEl);
    addLocalStorageToDom(doneStorage , doneListEl);
document.addEventListener("click" , findList)

//find the corect list of the button that pressed
function findList(e){
    const target  = e.target; // the button that pressed
    if(target.id === "submit-add-to-do")
    {
        addTask(inputAddToDoEl , toDoListEl , toDoStorage);
    }
    else if(target.id === "submit-add-in-progress")
    {
        addTask(inputAddInProgressEl , inProgressListEl , inProgressStorage);
    }
    else if(target.id === "submit-add-done")
    {
        addTask(inputAddDoneEl , doneListEl , doneStorage);
    }
}

/*--------------------------------------------------------*/
//check if the text is not empty
function validateTask(taskText){
    if(!taskText)
    {
        throw alert("You must enter content");
    }
    return taskText;
}
/*--------------------------------------------------------*/

/*--------------------------------------------------------*/
//clear the tasks from the dom
function clearDom(){
    for(let li of document.querySelectorAll("li"))
    {
        li.remove();
    }
}
/*--------------------------------------------------------*/
// add the task to the correct list and to the local storage
function addTask (input , domList , storageList){
    
    // if(!input.value)
    // {
    //     return alert("You must enter content");
    // }
    // const liEl = document.createElement("li");
    // liEl.setAttribute("class", "task");
    // liEl.setAttribute("draggable" , "true");
    // liEl.innerText = validateTask(input.value);
    // domList.insertBefore(liEl, domList.firstChild);
    storageList.unshift(validateTask(input.value));
    localStorage.setItem("tasks" ,JSON.stringify(localStorageObj));
    clearDom();
    addLocalStorageToDom(toDoStorage , toDoListEl);
    addLocalStorageToDom(inProgressStorage , inProgressListEl);
    addLocalStorageToDom(doneStorage , doneListEl);

    input.value = "";//clear the input value after submit
}

document.addEventListener("click" , textEditable);
// make the text list editable
function textEditable(event){
    if(event.target.classList.contains("task"))
    {
        event.target.setAttribute("contenteditable" ,"true");
        findEditList(event);
    }   
}

let indexOfOldTask; // for the splice
// find the correct iist of the edit text
function findEditList(event){
    const li = event.target;
    const buttonId = li.parentElement.parentElement.parentElement.querySelector("button").id;
    if(buttonId === "submit-add-to-do")
    {
        indexOfOldTask = toDoStorage.indexOf(li.innerText); // for the splice
        li.addEventListener("blur" , findEditedStorageList);    
    }
    else if(buttonId === "submit-add-in-progress")
    {
        indexOfOldTask = inProgressStorage.indexOf(li.innerText); // for the splice
        li.addEventListener("blur" , findEditedStorageList);    
    }
    else if(buttonId === "submit-add-done")
    {
        indexOfOldTask = doneStorage.indexOf(li.innerText); // for the splice
        li.addEventListener("blur" , findEditedStorageList);    
    }
}
// send the correct arr to the saveEditText function
function findEditedStorageList(event){
    const li = event.target;
    const buttonId = li.parentElement.parentElement.parentElement.querySelector("button").id;
    if(buttonId === "submit-add-to-do")
    {
        saveEditText(li , toDoStorage);
    }
    if(buttonId === "submit-add-in-progress")
    {
        saveEditText(li , inProgressStorage);
    }
    if(buttonId === "submit-add-done")
    {
        saveEditText(li , doneStorage);
    }
}
//save the edited text in the local storage
function saveEditText (input  , storageList){
    if(input.innerText === "") return alert("You must enter content");
    storageList.splice(indexOfOldTask,1,input.innerText);
    localStorage.setItem("tasks" ,JSON.stringify(localStorageObj));
}
// A function that takes an event, what you want to apply the event to, and what will happen when the event happens
function addGlobalEventListener( type , selector , callback){
    document.addEventListener(type , e => {
    if (e.target.matches(selector)) callback(e);
    })
}

let elementThatMove; // the element that we need to remove
// when the mouse over <li> addEventKeydown function will play
addGlobalEventListener("mouseover" , "li" , addEventKeydown);
// start to listen keydown event
function addEventKeydown(element){
   elementThatMove = element.target;
   document.addEventListener("keydown" , findKeyList);
}
//find the ul we want to move the task to
function findKeyList(event){
    if(event.altKey && event.key === "1" )
    {
        moveTask(toDoListEl , toDoStorage);
    }
    else if(event.altKey && event.key === "2" )
    {
        moveTask(inProgressListEl , inProgressStorage);
    }
    else if(event.altKey && event.key === "3" )
    {
        moveTask(doneListEl , doneStorage);
    }
}
// delete the task from his old ul and add it to the new one
function moveTask(domList , storageList ){
    let oldUl = elementThatMove.parentElement.className; // the old ul of the task that we want to move
    if(oldUl === "to-do-tasks")
    {
        let i = toDoStorage.indexOf(elementThatMove.innerText);
        toDoStorage.splice(i,1);
    }
    else if(oldUl === "in-progress-tasks")
    {
        let i = inProgressStorage.indexOf(elementThatMove.innerText);
        inProgressStorage.splice(i,1);
    }
    else if(oldUl === "done-tasks")
    {
        let i = doneStorage.indexOf(elementThatMove.innerText);
        doneStorage.splice(i,1);
    }
    domList.insertBefore(elementThatMove, domList.firstChild); // move the task in the dom
    storageList.unshift(elementThatMove.innerText); // move the task in the local storage
    localStorage.setItem("tasks" ,JSON.stringify(localStorageObj));
}


// show only the tasks with the same text of the search input
const searchEl = document.getElementById("search");
searchEl.addEventListener("keyup" , searchTasks);
function searchTasks(){
    let allLi = document.getElementsByClassName("task");
    for(let list of allLi){
        if(!list.innerText.toLowerCase().includes(searchEl.value.toLowerCase()))
        {
        list.style.display = "none";
        }else
        {
            list.style.display = "";
        }
    }
}

let dragged;

document.addEventListener("dragstart", function( event ) {
    dragged = event.target; // store a ref. on the dragged elem
    event.target.style.opacity = .5; // make it half transparent
}, false);

document.addEventListener("dragend", function( event ) {
    event.target.style.opacity = ""; // reset the transparency
}, false);

 /* events fired on the drop targets */
 document.addEventListener("dragover", function( event ) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function( event ) {
    // highlight potential drop target when the draggable element enters it
    if ( event.target.className === "dropzone" ) {
        event.target.style.background = "purple";
    }
}, false);

document.addEventListener("dragleave", function( event ) {
    // reset background of potential drop target when the draggable element leaves it
    if ( event.target.className === "dropzone" ) {
        event.target.style.background = "";
    }
}, false);

document.addEventListener("drop", function( event ) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if ( event.target.className === "dropzone" ) 
    {
        event.target.style.background = "";
        // before the change in the dom 
        if(dragged.parentNode.className === "to-do-tasks")
        {
            let i = toDoStorage.indexOf(dragged.innerText);
            toDoStorage.splice(i,1);
        }
        else if(dragged.parentNode.className === "in-progress-tasks")
        {
            let i = inProgressStorage.indexOf(dragged.innerText);
            inProgressStorage.splice(i,1);
        }
        else if(dragged.parentNode.className === "done-tasks")
        {
            let i = doneStorage.indexOf(dragged.innerText);
            doneStorage.splice(i,1);
        }
        // change in the dom
        dragged.parentNode.removeChild( dragged );
        event.target.children[0].insertBefore(dragged , event.target.children[0].firstChild);
        // after the change in the dom 
        if(dragged.parentNode.className === "to-do-tasks")
        {
            toDoStorage.unshift(dragged.innerText);
        }
        else if(dragged.parentNode.className === "in-progress-tasks")
        {
            inProgressStorage.unshift(dragged.innerText);
        }
        else if(dragged.parentNode.className === "done-tasks")
        {
            doneStorage.unshift(dragged.innerText);
        }
        localStorage.setItem("tasks" ,JSON.stringify(localStorageObj));
    }
}, false);

document.getElementById("save-btn").addEventListener("click",saveToApi);
async function saveToApi(){
    const spinner = document.createElement("div");
    spinner.classList.add("loader");
    document.querySelector(".search-block").appendChild(spinner);
    const response = await fetch("https://json-bins.herokuapp.com/bin/614add3a4021ac0e6c080c22",{
        method:"PUT",
        headers: { Accept: "application/json",
        "Content-Type": "application/json"},
        body: JSON.stringify({"tasks":localStorageObj})
    })
    document.querySelector(".search-block").removeChild(spinner);
    if(response.status >= 400)
    {
        throw alert("Error: " + response.status);
    }
}   

document.getElementById("load-btn").addEventListener("click",loadToDom);
async function loadToDom(){
    const spinner = document.createElement("div");
    spinner.classList.add("loader");
    document.querySelector(".search-block").appendChild(spinner);
    const response = await fetch("https://json-bins.herokuapp.com/bin/614add3a4021ac0e6c080c22",{
        method:"GET",
        headers: { Accept: "application/json",
         "Content-Type": "application/json"},
    })
    document.querySelector(".search-block").removeChild(spinner);
    if(response.status >= 400)
    {
        throw alert("Error: " + response.status);
    }
    const data = await response.json();
    localStorage.setItem("tasks" ,JSON.stringify(data.tasks));
    window.location.reload(false); 
}


// clear all tasks from the dom and options to clear the local storage to 
document.getElementById("clear-btn").addEventListener("click",clearTasks);
function clearTasks(){
    if(confirm("Do you want to delete from the local storage as well?"))
    {
        localStorageObj = {"todo": [],"in-progress": [],"done": []}
        localStorage.setItem("tasks" ,`{"todo": [],"in-progress": [],"done": []}` );//clear from the local storag to
    }
    for(let li of document.querySelectorAll("li"))
    {
        li.remove();
    }
}