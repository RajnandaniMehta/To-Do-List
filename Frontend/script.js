let resBtn=document.querySelector("#resources");
let dDrop=document.querySelector("#dropdwn");

resBtn.addEventListener("mouseenter",()=>{
    dDrop.style.display="block";
    console.log("I Listened",dDrop);
});
let f=false;
resBtn.addEventListener("click",()=>{
    f=!f;
    if(f)
    dDrop.style.display="block";
    else
    dDrop.style.display="none";
    console.log("I Listened",dDrop);
});
resBtn.addEventListener("mouseleave",()=>{
    if(!f)
    dDrop.style.display="none";
});
let trialBtns=document.querySelectorAll("#trialBtn");
for(b of trialBtns){
    b.addEventListener("click",(event)=>{
        window.location.href = "/register"; 
    });
}

