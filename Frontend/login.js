// let email="raj@gmail.com";
// let pass=123;

// let inp=document.querySelectorAll("input");
// let loginBtn=document.querySelector("button");
// console.log(inp[0].value);
// loginBtn.addEventListener("click",(event)=>{
//     event.preventDefault();
//     console.log("button clicked");
//     if((email==inp[0].value) && (pass==inp[1].value)){
//     console.log("Correct user");
//     let link=document.createElement("a");
//     link.href="home.html";
//     document.body.appendChild(link);
//     link.click();
//     // window.location.href="home.html";
//     }
//     else 
//     console.log("Not Correct user");
// })


let formlogin=document.getElementById("login");

formlogin.addEventListener("submit",async function(e){
    e.preventDefault();
    const formData=new FormData(this);
    const userData={
        email:formData.get("email"),
        password:formData.get("password"),
    };
    console.log(userData);
    try{
        const response=await fetch("http://localhost:9000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        const data=await response.json();
        if(response.ok){
            alert(data.message);
            window.location.href=data.redirect;
        }else{
            alert(data.message);
        }
    }catch(err){
        console.log(err);
    }
})