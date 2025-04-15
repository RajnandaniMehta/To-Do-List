let list=[];
let adBtns=document.querySelectorAll(".addBtn");
let fAdd=false;
let d=document.querySelector(".addTask");
let addTask=document.querySelector("#addTaskBtn");


let inbBtn=document.querySelector("#inboxBtn");
let inbSec=document.querySelector("#inbox");
let Sec=document.querySelectorAll(".sec");
let inbUl=document.querySelector("#inboxlist");
let todayBtn=document.querySelector("#todayBtn");
let todaySec=document.querySelector("#today");

let editIdx=null;
let shTask=document.querySelectorAll(".showtask");
let inp=document.querySelector("#inpTask");


function removeTaskLog(){                                 //for toggling addtask division
    fAdd=!fAdd;                                      
    if(fAdd){
        d.style.display="block";
    }else{
        d.style.display="none";
    }
}

for(btn of adBtns){                                     //for addbtn on the page
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        removeTaskLog();
        
    });
}

// addTask.addEventListener("click",()=>{    
//     console.log(inp.value);                //for adding task
//     if(inp.value=="") return;
//     if (editIdx !== null) {
//             document.querySelectorAll("#showToday li")[editIdx].firstChild.textContent = inp.value;     //edit today task
//             document.querySelectorAll("#showInbox li")[editIdx].firstChild.textContent = inp.value;     //edit inbox task
//             list[editIdx] = inp.value;
//             editIdx = null;
//             addTask.textContent = "Add task";
//     } else{
       
//         list.push(inp.value);
//         let item=document.createElement("li");             //creating li
//         item.innerText=inp.value;

//         let editBtn=document.createElement("button");
//         editBtn.innerText="edit";
//         editBtn.classList.add("edit");
//         item.appendChild(editBtn);
//         let delBtn=document.createElement("button");
//         delBtn.innerText="delete";
//         delBtn.classList.add("delete");
//         item.appendChild(delBtn);

//         for(s of shTask){
//         s.appendChild(item.cloneNode(true));              //appending to today and inbox section
//          }
//         //  console.log("reached here");
//     }
//     inp.value="";
//     console.log(list);
   
// });

let cancel=document.querySelector("#cancelTask");           //cancel button
cancel.addEventListener("click",()=>{
    inp.value="";
    addTask.textContent = "Add task";
    removeTaskLog();
});

for(s of shTask){                                            //edit and delete functionality
    s.addEventListener("click",(e)=>{
        // console.log("del clicked",e.target.className);
        let par=e.target.parentElement;
        let parentTaskList = par.closest(".showtask");
        if(e.target.className=="delete"){
            let index = Array.from(parentTaskList.children).filter(el => el.tagName === "LI").indexOf(par);

            document.querySelectorAll("#showToday li")[index].remove();
            document.querySelectorAll("#showInbox li")[index].remove();
            list.splice(index, 1);
        }
        if(e.target.className=="edit"){
        //     fAdd=false;
        //     removeTaskLog();
        //    inp.value=par.firstChild.textContent;
          
        // //    console.log(inp.value);
           editIdx = Array.from(parentTaskList.children).filter(el => el.tagName === "LI").indexOf(par);
              console.log(editIdx);
        //    addTask.textContent = "Save";
        fetch(`/tasks/${userId}/${editIdx}`) .then(res => res.json())
        .then(data => {
          if (data.success) {
            window.location.href=data.redirect;
            
          } else {
            console.error("User not found");
          }
        })
        .catch(err => {
          console.error("Error fetching user:", err);
        });
        
        }
    
    });
}



todayBtn.addEventListener("click",(e)=>{                //display today section
    e.preventDefault();
    for(s of Sec){
        if(s!=todaySec)
        s.style.display="none";
    }
    todaySec.style.display="block";
});

// //section2

inbBtn.addEventListener("click",(e)=>{                  //display inbox section
    e.preventDefault();
    for(s of Sec){
        if(s!=inbSec)
        s.style.display="none";
    }
    inbSec.style.display="block";
});



//backend
const userId = window.location.pathname.split("/").pop();

fetch(`/home/user/${userId}`)
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      const username = data.user.username;
      document.getElementById("userName").textContent = username;
      const contentParagraph = document.querySelector("#today .content p");
      contentParagraph.innerHTML = `You're all done for today, ${username}! <br>
      Enjoy the rest of your day and don't forget to share your #TodoistZero awesomeness`;

      const tasks=data.user.tasks;
        tasks.forEach(task => {
            let item = document.createElement("li");
            item.innerText = task;
    
            let editBtn = document.createElement("button");
            editBtn.innerText = "edit";
            editBtn.classList.add("edit");
            item.appendChild(editBtn);
    
            let delBtn = document.createElement("button");
            delBtn.innerText = "delete";
            delBtn.classList.add("delete");
            item.appendChild(delBtn);
    
            for (let s of document.querySelectorAll(".showtask")) {
              s.appendChild(item.cloneNode(true));
            }
          });
    } else {
      console.error("User not found");
    }
  })
  .catch(err => {
    console.error("Error fetching user:", err);
  });


  addTask.addEventListener("click", async () => {
    const task = inp.value.trim();
    const userId = window.location.pathname.split("/").pop();
  
    if (task === "") return;
    try {
      const res = await fetch(`/home/users/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ task })
      });
  
      const data = await res.json();
  
      if (data.success) {
        let item = document.createElement("li");
        item.innerText = task;
  
        let editBtn = document.createElement("button");
        editBtn.innerText = "edit";
        editBtn.classList.add("edit");
        item.appendChild(editBtn);
  
        let delBtn = document.createElement("button");
        delBtn.innerText = "delete";
        delBtn.classList.add("delete");
        item.appendChild(delBtn);
        for (let s of document.querySelectorAll(".showtask")) {
          s.appendChild(item.cloneNode(true));
        }
        inp.value = "";
        addTask.textContent = "Add task";
        removeTaskLog();
      } else {
        alert("Failed to add task.");
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  });
  
