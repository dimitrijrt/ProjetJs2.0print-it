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
const modal = document.getElementById("modaleuser");
const modalback = document.querySelector(".modalback2");

// Get the button that opens the modal
const btn = document.getElementById("btnmodal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  modalback.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  modalback.style.display = "none";
  modal2.style.display = "none";
  modal3.style.display = "none";

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// visualiser la modal edit onclick sur modifier
// Get the modal
const modal2 = document.querySelector(".modaladd");
const modal3 = document.querySelector(".modalback");

// Get the button that opens the modal
const btn2 = document.getElementById("btnadd");

btn2.onclick = function() {
    modal.style.display = "none";
    modal2.style.display = "block";
    modal3.style.display = "block";
}

const btnback = document.querySelector(".fa-arrow-left")

btnback.onclick = function() {
  modal.style.display = "block";
    modal2.style.display = "none";
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

  // recup token de l'admin

  const token = window.localStorage.getItem("accessToken");

  // fonction déconnexion
  function logOut(e) {
    localStorage.clear();
  };


// si connecté apparition barre admin et logout



const log = document.querySelector('.login');

  if (token !== null) {
    log.innerHTML = " ";
    log.innerHTML = "logout";
    log.addEventListener("click", logOut);
    const adminBar = document.querySelector(".head");
    adminBar.style.display = "block";
    const edit = document.querySelector(".modifier");
    edit.style.display = "block";


  }


  // fonction ajout

  async function addWork() {
    // e.preventDefault();
    
    // Récupération des saisies pour la création du nouvel élément
    const inputPicture = document.getElementById("image").files[0];
    // console.log(inputPicture);
    const inputTitle = document.getElementById("title").value;
    // console.log(inputTitle);
    const inputCategorie = document.getElementById("categories").value;
    // console.log(inputCategorie);
  
    // Construction du formData à envoyer
    const formData = new FormData();
    formData.append("image", inputPicture);
    formData.append("title", inputTitle);
    formData.append("categories", inputCategorie);
  
    // Appel de la fonction fetch avec toutes les informations nécessaires
    let response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    });

  }

