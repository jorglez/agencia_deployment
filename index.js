//crear acceso a las funciones de express
//const express = require('express');
import express from "express";
import router from "./routes/index.js"
import db from './config/db.js'
import dotenv from 'dotenv';
dotenv.config({path:'variables.env'});

const app = express()

//conectar la base de datos
db.authenticate()
    .then(()=> console.log('conectado a la base de datos'))
    .catch(()=> console.log('error al conectar a la base de datos'))

//definir puerto

const port = process.env.PORT || 4000

//habilitar pug

app.set('view engine', 'pug')

//obtener el año actual

app.use((req, res, next)=>{
    const anno = new Date()
    res.locals.annoActual = anno.getFullYear()
    res.locals.nombrePag = "Agencia de Viajes"
    next()
})

//obtener body parser para leer los datos del formulario

app.use(express.urlencoded({extended: true}))


//definir la carpeta publica

app.use(express.static('public'))

//Agregar Router
app.use('/', router)

app.listen(port,() =>{
    console.log(`El servidor está funcionando en el puesto ${port}`)
})