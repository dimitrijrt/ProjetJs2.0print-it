const mail = document.getElementById("email").value;
const passe = document.getElementById("password").value;


const infosLogin = document.querySelector(".login");

const connect = document.querySelector(".connect");


connect.addEventListener("click",  () => {

	console.log("test");
 

});



  let user = {
    email:mail,
    mdp: passe,
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