const exp = require('constants');
const express = require('express');
const App = express();
App.use(express.static('public'));
const productos=require('./rutas/productos.route');

App.use(express.json());
App.use(express.urlencoded({ extended: false }));

const Port = 8080;


App.use('/api',productos);
// =========== LEVANTAR SERVIDOR==========
App.listen(Port, () => console.log(`Servidor Corriendo en el puerto ${Port} `))
// =========== CORRIENDO APLICACION=======




