const divButtonFilter = document.querySelector('.bouttons');
let dataWorks = [];
let dataWorksFiltered = [];
let dataCategories = [];

// Recup données Api
async function dataApi() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        dataWorks = data;
        showWorks(dataWorks);
        modalWorks(dataWorks);
    } catch {
        console.log('error');
    }
};


// Recup les "categories" de l'API
async function fetchCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    dataCategories = data;

    // création des boutons dans l'html avec les données de l'api ( titre et id )
    dataCategories.map((category) => {
        const button = document.createElement('button');
        button.dataset.id = category.id;
        button.textContent = category.name;
        divButtonFilter.appendChild(button);
    })
};

// fonction qui permet de créer img en html provenant de l'api et de l'afficher
function showWorks(data) {
    const imgCategories = document.querySelector(".gallery");
    imgCategories.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const figure = document.createElement("figure");
        // Affiche images
        figure.innerHTML = `
      <img src="${data[i].imageUrl}" alt="${data[i].title}" crossorigin="anonymous">
      <figcaption>${data[i].title}</figcaption>
    `;
        imgCategories.appendChild(figure);
    }
};


function filtrerCategories() {
    dataWorksFiltered = dataWorks;
    const buttonFilters = document.querySelectorAll('.bouttons button');
    buttonFilters.forEach((buttonFilter) => buttonFilter.addEventListener('click', () => {
        buttonFilters.forEach((buttonFilter2) => buttonFilter2.classList.remove('selected'));
        buttonFilter.classList.add('selected');
        if (!buttonFilter.classList.contains('all')) {
            showWorks(dataWorksFiltered.filter((work) => work.categoryId == buttonFilter.dataset.id));
        } else {
            showWorks(dataWorks)
        }
    }))
};

addEventListener('DOMContentLoaded', async (e) => {
    await dataApi();
    await fetchCategories();
    await filtrerCategories();
    
})


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("mybtnmodal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




// affiche works dans la modal
function modalWorks(data) {
    const modalGall = document.querySelector(".modal_gallery");
    modalGall.innerHTML = "";
  
    
    for (let i = 0; i < data.length; i++) {
      // Création d' éléments pour l'affichage des travaux
      const figure = document.createElement("figure");
      const deleteIcon = document.createElement("div");
      deleteIcon.value = data[i].id;
      // Affichage des works
      figure.innerHTML = `
                  <img src="${data[i].imageUrl}" alt="${data[i].title}" crossorigin="anonymous">
                  <figcaption>éditer</figcaption>
              `;

              const galleryEl = document.querySelector(".modal_gallery");
              galleryEl.appendChild(figure);


              const id = data[i].id;

    }
}

// visualiser la modal edit onclick sur modifier
// Get the modal
var modal = document.getElementById("modaleuser");

// Get the button that opens the modal
var btn = document.getElementById("btnmodal");

btn.onclick = function() {
    modal.style.display = "block";
  }


// afficher modal d'ajout photo après modal edit

var modalAdd = document.getElementById("modaladd");
var btnajout = document.getElementById("btnadd");


btn.onclick = function() {
    modalAdd.style.display = "block";
  }

  // recup token de l'admin

  const token = window.localStorage.getItem("accessToken");

  // fonction déconnexion
  function logOut(e) {
    localStorage.clear();
  };


// si connecté apparition barre admin et logout

  if (token !== null) {
    log.innerHTML = " ";
    log.innerHTML = "logout";
    log.addEventListener("click", logOut);
    const adminBar = document.querySelector(".head");
    adminBar.style.display = "block";

  }