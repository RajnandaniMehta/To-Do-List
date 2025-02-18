let resBtn=document.querySelector("#resources");
let dDrop=document.querySelector(".dropdwn");
let f=false;
resBtn.addEventListener("click",()=>{
    f=!f;
    if(f){
        dDrop.classList.add("visible");
        f=true;
    }else{
        dDrop.classList.remove("visible");
        f=false;
    }
    
    
    console.log("I Listened");
});