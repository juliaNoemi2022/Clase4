const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const alumnos = require('../datos/alumnos.json')

app.get('/alumnos', (req, res)=> {
    res.json( alumnos ).status(200)
})

app.get('/alumnos/:dni', (req, res)=>{
    const dni = req.params.dni
    const resultado = alumnos.find( alumno => alumno.dni == dni)
    if(resultado){
      res.status(200).json(resultado).status(200)  
    }else{
        res.status(404).json({mensaje:`El alumno con dni ${dni} no fue encontrado `}).status(404)
    }
  
})

app.delete('/alumnos/:dni', ( req , res)=>{
    const dni = req.params.dni
    const indice = alumnos.findIndex( alumno => alumno.dni == dni)
    if(indice == -1){
        res.status(404).json({
            indice:`La operacion de borrado no pudo ser realizada`,
            mensaje: `El alumno con dni ${dni} no fue encontrado`})
    }else{
        const alumno = alumnos[indice];
        const resultado = alumnos.splice(indice, 1)
        res.status(200).json({resultado: "La operacion de borrado se realizo con exito",
                  alumno: alumno
                })
    }
})

app.listen(PORT, ()=>{console.log(`App lista escuchando en el puerto ${PORT}`)})