let formreg=document.getElementById("register");

formreg.addEventListener("submit",async function(e){
    e.preventDefault();
    const formData=new FormData(this);
    const userData={
        username:formData.get("username"),
        email:formData.get("email"),
        password:formData.get("password"),
    };
    try{
        const response=await fetch("http://localhost:9000/register", {
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

