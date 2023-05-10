const express = require('express');
const path = require('path');
const cors = require('cors')
require('dotenv').config();
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('swagger.yaml')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet({
      crossOriginResourcePolicy: false,
    }));
app.use('/images', express.static(path.join(__dirname, 'images')))

const db = require("./models");
const userRoutes = require('./routes/user.routes');
const categoriesRoutes = require('./routes/categories.routes');
const worksRoutes = require('./routes/works.routes');
db.sequelize.sync().then(()=> console.log('db is ready'));
app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/works', worksRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
module.exports = app;












function filtrerCategories(key) {
  // en fonction du paramètre key, filtre les travaux ciblés et change la couleur du bouton
  switch (key) {
    case "all":
      resetBtn();
      btnFiltersAll.style.color = "#ffffff";
      btnFiltersAll.style.background = "#1D6154";
      document.querySelector(".gallery").innerHTML = "";
      dataCatego(loadedData);
      break;
    case "Objets":
      // TODO
      resetBtn();
      btnFiltersObject.style.color = "#ffffff";
      btnFiltersObject.style.background = "#1D6154";
      document.querySelector(".gallery").innerHTML = "";
      dataCatego(
        loadedData.filter((work) => work.category.name.includes("Objets"))
      );
      break;
    case "Appartements":
      // TODO
      resetBtn();
      btnFiltersAppartment.style.color = "#ffffff";
      btnFiltersAppartment.style.background = "#1D6154";
      document.querySelector(".gallery").innerHTML = "";
      dataCatego(
        loadedData.filter((work) => work.category.name.includes("Appartements"))
      );
      break;
    case "Hotels & restaurants":
      // TODO
      resetBtn();
      btnFiltersHostel.style.color = "#ffffff";
      btnFiltersHostel.style.background = "#1D6154";
      document.querySelector(".gallery").innerHTML = "";
      dataCatego(
        loadedData.filter((work) =>
          work.category.name.includes("Hotels & restaurants")
        )
      );
      break;
    default:
      break;
  }
};