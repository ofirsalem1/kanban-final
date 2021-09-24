 // to do list elements
 const toDoListEl = document.getElementsByClassName("to-do-tasks")[0];
 const toDoButtonEl = document.getElementById("submit-add-to-do");
 const inputAddToDoEl = document.getElementById("add-to-do-task");
 // in progress list elements
 const inProgressListEl = document.getElementsByClassName("in-progress-tasks")[0];
 const inProgressButtonEl = document.getElementById("submit-add-in-progress");
 const inputAddInProgressEl = document.getElementById("add-in-progress-task");
 // done list elements
 const doneListEl = document.getElementsByClassName("done-tasks")[0];
 const doneButtonEl = document.getElementById("submit-add-done");
 const inputAddDoneEl = document.getElementById("add-done-task");
 // if is the first time of the user
  if(!JSON.parse(localStorage.getItem("tasks"))){
     localStorage.setItem("tasks" ,`{"todo": [],"in-progress": [],"done": []}` )
    } 
// put the data from the local storage in the lists 
function addLocalStorageData(listArr , List){
    for(let i = listArr.length -1; i >=0; i-- ){
        let liEl = document.createElement("li");
        liEl.setAttribute("class", "task");
        liEl.setAttribute("draggable" , "true");
        liEl.innerText = listArr[i];
        List.insertBefore(liEl, List.firstChild);
    }
}
let toDoArr = JSON.parse(localStorage.getItem("tasks")).todo;
let inProgressArr = JSON.parse(localStorage.getItem("tasks"))["in-progress"];
let doneArr = JSON.parse(localStorage.getItem("tasks")).done;
addLocalStorageData(toDoArr , toDoListEl);
addLocalStorageData(inProgressArr , inProgressListEl);
addLocalStorageData(doneArr , doneListEl);

document.addEventListener("click" , findList)
//find the corect list of the button 
function findList(event){
    const target  = event.target;
    if(target.id === "submit-add-to-do"){
        addTask(inputAddToDoEl,toDoListEl , toDoArr);
    }
    if(target.id === "submit-add-in-progress"){
        addTask(inputAddInProgressEl,inProgressListEl , inProgressArr);
    }
    if(target.id === "submit-add-done"){
        addTask(inputAddDoneEl,doneListEl , doneArr);
    }
}
// add the task to the correct list and to the local storage
function addTask (input , list , arr){
    if(!input.value){
        return alert("You must enter content");
    }
    const liEl = document.createElement("li");
    liEl.setAttribute("class", "task");
    liEl.setAttribute("draggable" , "true");
    liEl.innerText = input.value;
    list.insertBefore(liEl, list.firstChild);
    arr.unshift(input.value);
    localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
    input.value = "";//clear the input value after submit
}

document.addEventListener("click" , textEditable);
// make the text list editable
function textEditable(event){
    if(event.target.classList.contains("task")){
        event.target.setAttribute("contenteditable" ,"true");
        findEditList(event);
    }   
}

let indexOfOldTask; // for the splice
// fint the correct iist of the edit text
function findEditList(event){
    const li = event.target;
    const buttonId = li.parentElement.parentElement.parentElement.querySelector("button").id;
    if(buttonId === "submit-add-to-do"){
        indexOfOldTask = toDoArr.indexOf(li.innerText); // for the splice
        li.addEventListener("blur" , findEditedArr)    
    }
    if(buttonId === "submit-add-in-progress"){
        indexOfOldTask = inProgressArr.indexOf(li.innerText); // for the splice
        li.addEventListener("blur" , findEditedArr)    
    }
    if(buttonId === "submit-add-done"){
        indexOfOldTask = doneArr.indexOf(li.innerText); // for the splice
        li.addEventListener("blur" , findEditedArr)    
    }
}
// send the correct arr to the saveEditText function
function findEditedArr(event){
    const li = event.target;
    const buttonId = li.parentElement.parentElement.parentElement.querySelector("button").id
    if(buttonId === "submit-add-to-do"){
        saveEditText(li , toDoArr);
    }
    if(buttonId === "submit-add-in-progress"){
        saveEditText(li , inProgressArr);
    }
    if(buttonId === "submit-add-done"){
        saveEditText(li , doneArr);
    }
}
//save the edited text in the local storage
function saveEditText (input  , arr){
    if(input.innerText === "") return alert("You must enter content");
    arr.splice(indexOfOldTask,1,input.innerText);
    localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
}
        
// A function that takes an event, what you want to apply the event to, and what will happen when the event happens
function addGlobalEventListener( type , selector , callback){
    document.addEventListener(type , e => {
    if (e.target.matches(selector)) callback(e);
    })
}

let eTarget; // the element that we need to remove
// when the mouse over <li> addEventKeydown function will play
addGlobalEventListener("mouseover" , "li" , addEventKeydown);
// start to listen keydown event
function addEventKeydown(e){
   eTarget = e.target;
   document.addEventListener("keydown" , altPress);
}
//find the ul we want to move the task to
function altPress(el){
    if(el.altKey && el.key === "1" ){
        moveTask(toDoListEl , toDoArr);
    }
    if(el.altKey && el.key === "2" ){
        moveTask(inProgressListEl , inProgressArr);
    }
    if(el.altKey && el.key === "3" ){
        moveTask(doneListEl , doneArr);
    }
}
// delete the task from his old ul and add it to the new one
function moveTask(list , arr ){
    let oldUl = eTarget.parentElement.className; // the old ul of the task that we want to move
    if(oldUl === "to-do-tasks"){
        let i = toDoArr.indexOf(eTarget.innerText);
        toDoArr.splice(i,1);
    }
    if(oldUl === "in-progress-tasks"){
        let i = inProgressArr.indexOf(eTarget.innerText);
        inProgressArr.splice(i,1);
    }
    if(oldUl === "done-tasks"){
        let i = doneArr.indexOf(eTarget.innerText);
        doneArr.splice(i,1);
    }
    list.insertBefore(eTarget, list.firstChild); // move the task in the dom
    arr.unshift(eTarget.innerText); // move the task in the local storage
    localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
}


// show only the tasks with the same text of the search input
const searchEl = document.getElementById("search");
searchEl.addEventListener("keyup" , searchTasks);
function searchTasks(e){
    let allLi = document.getElementsByClassName("task");
    for(let list of allLi){
        if(!list.innerText.includes(searchEl.value)){
        list.style.display = "none";
        }else{
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
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "purple";
    }
}, false);

document.addEventListener("dragleave", function( event ) {
    // reset background of potential drop target when the draggable element leaves it
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "";
    }
}, false);

document.addEventListener("drop", function( event ) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "";
        dragged.parentNode.removeChild( dragged );
        console.log(event.target.children[0]);
        event.target.children[0].insertBefore(dragged , event.target.children[0].firstChild);
    }
}, false);


