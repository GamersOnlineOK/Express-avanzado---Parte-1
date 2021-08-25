const exp = require('constants');
const express = require('express');
const handlebars = require('express-handlebars');
const App = express();
// App.use(express.static('public'));
const productos = require('./rutas/productos.route');

App.use(express.json());
App.use(express.urlencoded({ extended: false }));

const Port = 8080;

App.engine('hbs', handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutsDir:__dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}))

App.set("views", "./views");
App.set("view engine", "hbs");
App.use(express.static("public"));


App.use('/api', productos);
// =========== LEVANTAR SERVIDOR==========
App.listen(Port, () => console.log(`Servidor Corriendo en el puerto ${Port} `))
// =========== CORRIENDO APLICACION=======




