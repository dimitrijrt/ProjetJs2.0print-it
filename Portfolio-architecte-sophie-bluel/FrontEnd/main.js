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
    } catch {
        console.log('error');
    }
};

async function fetchCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    dataCategories = data;

    dataCategories.map((category) => {
        const button = document.createElement('button');
        button.dataset.id = category.id;
        button.textContent = category.name;
        divButtonFilter.appendChild(button);
    })
};


function showWorks(data) {
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
    await filtrerCategories()
})