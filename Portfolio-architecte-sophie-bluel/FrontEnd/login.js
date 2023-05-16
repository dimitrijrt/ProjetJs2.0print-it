




const boutonConnect = document.querySelector(".connect");


boutonConnect.addEventListener("click",  () => {

	console.log("test");
 

});




const mail = document.getElementById("email").value;
const pass = document.getElementById("password").value;

  let user = {
    email:mail,
    password: pass,
  };
  
  // POST REQUEST
  let response = await fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });
  
  let result = await response.json();
  alert(result.message);