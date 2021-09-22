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
 let toDoArr = JSON.parse(localStorage.getItem("tasks")).todo;
 // put the data from the local storage in the to do list 
 for(let i = toDoArr.length -1; i >=0; i-- ){
    let liEl = document.createElement("li")
    liEl.setAttribute("class", "task");
    liEl.innerText = toDoArr[i]
    toDoListEl.insertBefore(liEl, toDoListEl.firstChild);
}
let inProgressArr = JSON.parse(localStorage.getItem("tasks"))["in-progress"];
 // put the data from the local storage in the in progress list 
for(let i = inProgressArr.length -1; i >=0; i-- ){
    let liEl = document.createElement("li")
    liEl.setAttribute("class", "task");
    liEl.innerText = inProgressArr[i]
    inProgressListEl.insertBefore(liEl, inProgressListEl.firstChild);
}
let doneArr = JSON.parse(localStorage.getItem("tasks")).done;
 // put the data from the local storage in the done list
 for(let i = doneArr.length -1; i >=0; i-- ){
    let liEl = document.createElement("li")
    liEl.setAttribute("class", "task");
    liEl.innerText = doneArr[i]
    doneListEl.insertBefore(liEl, doneListEl.firstChild);
}

 document.addEventListener("click" , addTask)
 function addTask(event){
     console.log(event.target);
     const target  = event.target;
     const liEl = document.createElement("li");
       liEl.setAttribute("class", "task" );
       liEl.setAttribute("contenteditable", "true")
       if(target.id === "submit-add-to-do"){
           if(!inputAddToDoEl.value){
              return alert("You must enter content");
            }
            liEl.innerText = inputAddToDoEl.value;
            toDoListEl.insertBefore(liEl, toDoListEl.firstChild);
            toDoArr.unshift(inputAddToDoEl.value);
            localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
            inputAddToDoEl.value = ""
        }
        if(target.id === "submit-add-in-progress"){
            if(!inputAddInProgressEl.value){
               return alert("You must enter content");
            }
            liEl.innerText = inputAddInProgressEl.value;
            inProgressListEl.insertBefore(liEl, inProgressListEl.firstChild);
            inProgressArr.unshift(inputAddInProgressEl.value);
            localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
            inputAddInProgressEl.value = ""

        }
        if(target.id === "submit-add-done"){
            if(!inputAddDoneEl.value){
               return alert("You must enter content");
            }
            liEl.innerText = inputAddDoneEl.value;
            doneListEl.insertBefore(liEl, doneListEl.firstChild);
            doneArr.unshift(inputAddDoneEl.value);
            localStorage.setItem("tasks" ,JSON.stringify({"todo": toDoArr,"in-progress": inProgressArr,"done": doneArr}));
            inputAddDoneEl.value = ""

        }
    }



