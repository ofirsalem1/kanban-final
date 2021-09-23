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
    const buttonId = li.parentElement.parentElement.querySelector("button").id;
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
    const buttonId = li.parentElement.parentElement.querySelector("button").id
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
    // const liEl = document.createElement("li");
    // liEl.setAttribute("class", "task");
    // liEl.innerText = input.value;
    // list.insertBefore(liEl, list.firstChild);
}
        

let eTarget;

addGlobalEventListener("mouseover" , "li" , myFunction)
function myFunction(e){
   eTarget = e.target;
   document.addEventListener("keydown" , altPress);
}




function altPress(el){
    if(el.altKey && el.key === "1" ){
        moveTask(toDoListEl , toDoArr);
    }
        
    //     if(eTarget.parentElement.className === "to-do-tasks"){
    //         let i = toDoArr.indexOf(eTarget.innerText);
    //         toDoArr.splice(i,1)
    //      }
    //     if(eTarget.parentElement.className === "in-progress-tasks"){
    //        let i = inProgressArr.indexOf(eTarget.innerText);
    //        inProgressArr.splice(i,1)
    //     }
    //     if(eTarget.parentElement.className === "done-tasks"){
        //         let i = doneArr.indexOf(eTarget.innerText);
        //         doneArr.splice(i,1)
        //      }
        
        // toDoListEl.insertBefore(eTarget, toDoListEl.firstChild); // move the task in the dom
        // toDoArr.unshift(eTarget.innerText); // move the task in the local storage
    // localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
    
    
    // }
    if(el.altKey && el.key === "2" ){
        moveTask(inProgressListEl , inProgressArr);
    }
        // inProgressListEl.insertBefore(eTarget, inProgressListEl.firstChild);
        // inProgressArr.unshift(eTarget.innerText);
        // localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
        // } 
        if(el.altKey && el.key === "3" ){
            moveTask(doneListEl , doneArr);
        }
            // doneListEl.insertBefore(eTarget, doneListEl.firstChild);
            // doneArr.unshift(eTarget.innerText);
            // localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
            // }  
        }
function moveTask(list , arr ){
    
    if(eTarget.parentElement.className === "to-do-tasks"){
                let i = toDoArr.indexOf(eTarget.innerText);
                toDoArr.splice(i,1)
             }
            if(eTarget.parentElement.className === "in-progress-tasks"){
               let i = inProgressArr.indexOf(eTarget.innerText);
               inProgressArr.splice(i,1)
            }
            if(eTarget.parentElement.className === "done-tasks"){
                    let i = doneArr.indexOf(eTarget.innerText);
                    doneArr.splice(i,1)
                 }
    list.insertBefore(eTarget, list.firstChild); // move the task in the dom
    arr.unshift(eTarget.innerText); // move the task in the local storage
    localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
    // let i = eTarget.parentElement.id.indexOf(eTarget.innerText);
    // eTarget.parentElement.id.splice(i,1)



            // if(eTarget.parentElement.className === "to-do-tasks"){
            //     let i = arr.indexOf(eTarget.innerText);
            //     arr.splice(i,1)
            //     arr.unshift(eTarget.innerText);
            // }
            // if(eTarget.parentElement.className === "in-progress-tasks"){
            // let i = inProgressArr.indexOf(eTarget.innerText);
            // arr.splice(i,1);
            // arr.unshift(eTarget.innerText);
            // }
            // if(eTarget.parentElement.className === "done-tasks"){
            //     let i = doneArr.indexOf(eTarget.innerText);
            //     arr.splice(i,1);
            //     arr.unshift(eTarget.innerText);
            // }
            // list.insertBefore(eTarget, list.firstChild); // move the task in the dom
            // // arr.unshift(eTarget.innerText); // move the task in the local storage
            // localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
        }



function addGlobalEventListener( type , selector , callback){
    document.addEventListener(type , e => {
    if (e.target.matches(selector)) callback(e)
    })
}
    







// put the data from the local storage in the to do list 
//  for(let i = toDoArr.length -1; i >=0; i-- ){
//     let liEl = document.createElement("li");
//     liEl.setAttribute("class", "task");
//     liEl.innerText = toDoArr[i]
//     toDoListEl.insertBefore(liEl, toDoListEl.firstChild);
// }
// let inProgressArr = JSON.parse(localStorage.getItem("tasks"))["in-progress"];
// put the data from the local storage in the in progress list 
// for(let i = inProgressArr.length -1; i >=0; i-- ){
//     let liEl = document.createElement("li")
//     liEl.setAttribute("class", "task");
//     liEl.innerText = inProgressArr[i]
//     inProgressListEl.insertBefore(liEl, inProgressListEl.firstChild);
// }
// let doneArr = JSON.parse(localStorage.getItem("tasks")).done;
// put the data from the local storage in the done list
//  for(let i = doneArr.length -1; i >=0; i-- ){
//     let liEl = document.createElement("li")
//     liEl.setAttribute("class", "task");
//     liEl.innerText = doneArr[i]
//     doneListEl.insertBefore(liEl, doneListEl.firstChild);
// }
// const liEl = document.createElement("li");
// liEl.setAttribute("class", "task" );
//if(target.id === "submit-add-to-do"){
// if(!inputAddToDoEl.value){
//     return alert("You must enter content");
// }
// liEl.innerText = inputAddToDoEl.value;
// toDoListEl.insertBefore(liEl, toDoListEl.firstChild);
// toDoArr.unshift(inputAddToDoEl.value);
// localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
// inputAddToDoEl.value = ""
//if(target.id === "submit-add-in-progress"){
//     if(!inputAddInProgressEl.value){
//         return alert("You must enter content");
//     }
//     liEl.innerText = inputAddInProgressEl.value;
//     inProgressListEl.insertBefore(liEl, inProgressListEl.firstChild);
//     inProgressArr.unshift(inputAddInProgressEl.value);
//     localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
//     inputAddInProgressEl.value = ""
// }
// if(target.id === "submit-add-done"){
//     if(!inputAddDoneEl.value){
//         return alert("You must enter content");
//     }
//     liEl.innerText = inputAddDoneEl.value;
//     doneListEl.insertBefore(liEl, doneListEl.firstChild);
//     doneArr.unshift(inputAddDoneEl.value);
//     localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
//     inputAddDoneEl.value = ""

// }

