const boutonAll = document.querySelector(".all");
const boutonObjets = document.querySelector(".objets");
const boutonApparts = document.querySelector(".apparts");
const boutonHotels = document.querySelector(".hotels");

boutonAll.addEventListener("click",  () => {



	console.log("oklm");
  filtrerCategories("all");

});

boutonObjets.addEventListener("click", () => {
	console.log("testtt");
  filtrerCategories("Objets");

	

});

boutonApparts.addEventListener("click", () => {
	filtrerCategories("Appartements");

	

});

boutonHotels.addEventListener("click", () => {
	filtrerCategories("Hotels & restaurants");
   

	

});


let dataWorks = [];

// Recup données Api
async function dataApi() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  dataWorks = data;
  dataCatego(dataWorks);
  
};



function dataCatego(data) {
  const imgCategories = document.querySelector(".gallery");
  imgCategories.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    // constante du début
    const figure = document.createElement("figure");
    // Affiche images
    figure.innerHTML = `
      <img src="${data[i].imageUrl}" alt="${data[i].title}" crossorigin="anonymous">
      <figcaption>${data[i].title}</figcaption>
    `;
    imgCategories.appendChild(figure);
  }
};



function filtrerCategories(key) {
    switch (key) {
      case "all":
       
        dataCatego(dataWorks);
        break;
      case "Objets":

      
        dataCatego(
          dataWorks.filter((work) => work.category.name.includes("Objets"))
        );
        break;
      case "Appartements":
     
        dataCatego(
          dataWorks.filter((work) => work.category.name.includes("Appartements"))
        );
        break;
      case "Hotels & restaurants":
       
        dataCatego(
          dataWorks.filter((work) =>
            work.category.name.includes("Hotels & restaurants")
          )
        );
        break;
      default:
        break;
    }
  };
  
  dataApi();