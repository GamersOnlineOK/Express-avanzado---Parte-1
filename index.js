const exp = require('constants');
const express = require('express')
const App = express();
App.use(express.json());
App.use(express.urlencoded({ extended: false }));
const fs = require("fs");
const Port = 8080;
const FILE_PRODUCTOS = "productos.txt";
// =========== LEVANTAR SERVIDOR==========
App.listen(Port, () => console.log(`Servidor Corriendo en el puerto ${Port} `))
// =========== CORRIENDO APLICACION=======

// METODOS GET
// ==============LISTAR PRODUCTO===================
App.get('/api/productos/listar', (req, res) => {
    var productos = fs.promises.readFile(FILE_PRODUCTOS)
        .then(data => data.toString('utf-8'))
        .then(datos => {
            const json = JSON.parse(datos);
            {json.length>0?(res.json({ item: json, cantidad: json.length })):(res.send("no hay productos en la lista"))}
            
        })
})
// ==============MOSTRAR PRODUCTO===================
App.get('/api/productos/listar/:id', (req, res) => {
    let parametro = req.params.id;
    fs.promises.readFile('./productos.txt')
        .then(data => data.toString('utf-8'))
        .then(datos => {
            const json = JSON.parse(datos);
            const filter=json.filter(data=>data.id==parametro);
            { filter.length>0 ? (res.json({ filter })) : (res.json({ error: 'producto no encontrado' })) }

        })
})
// ==============GUARDAR PRODUCTO===================
App.post('/api/productos/guardar', (req, res) => {
    
    const array = 
        {
            titulo: req.body.titulo,
            price: req.body.price,
            img: req.body.img,
            
        };
        
       
        fs.promises.readFile(FILE_PRODUCTOS).then(data => {

            const json = JSON.parse(data.toString('utf-8'));
            const producto=({...array, id:json.length +1});
            const productoFinal=json.push(producto);
            res.send(producto)
            fs.promises.writeFile(FILE_PRODUCTOS, JSON.stringify(json, null, "\t"))
            .then(() => {
                console.log("Producto Agregado Correctamente");
            })
        }).then(data=>{
            fs.promises.readFile(FILE_PRODUCTOS)
            .then(data=>JSON.parse(data.toString('utf-8')))
            .then(data=>res.json(data.length))
            
        })        
});
