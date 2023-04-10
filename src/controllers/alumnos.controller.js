const alumnos = require('../../datos/alumnos.json')

const getAllAlumnos = (req, res)=> {
    res.json( alumnos ).status(200)
}

const getAlumnoByDni = (req, res)=>{
    const dni = req.params.dni
    const resultado = alumnos.find( alumno => alumno.dni == dni)
    if(resultado){
      res.status(200).json(resultado).status(200)  
    }else{
        res.status(404).json({mensaje:`El alumno con dni ${dni} no fue encontrado `}).status(404)
    }
  
}

const deletealumnoByDni= ( req , res)=>{
    const dni = req.params.dni
    const indice = alumnos.findIndex( alumno => alumno.dni == dni)
    if(indice == -1){
        res.status(404).json({
            indice:`La operacion de borrado no pudo ser realizada`,
            mensaje: `El alumno con dni ${dni} no fue encontrado`})
    }else{
        const alumno = alumnos[indice];
        const resultado = alumnos.splice(indice, 1)
        res.status(200).json({
            resultado: "La operacion de borrado se realizo con exito",
            alumno: alumno
                })
    }
}

const createAlumno = (req , res) =>{
    const alumnosData = req.body
    const existe = alumnos.find( alumno=> alumno.dni == alumnosData.dni)
    if(!existe){
        if(!alumnosData.tiene_Curso)
           alumnosData.tiene_Curso= false
        if(!alumnosData.nombre){
            res.status(400).json({
                mensaje: `Para generar al alumno con dni ${alumnosData.dni} se necesita ingresar el nombre de manera obligatoria`
            })
        }
    alumnos.push(alumnosData)
    res.status(201).json({nmensaje: `El alumnno con dni ${alumnosData.dni} fue creado correctamente`})

}else{
    res.status(400).json({nmensaje: `El alumnno con dni ${alumnosData.dni} ya existe`})

}
}

const updateAlumno = (req, res)=>{
    const dni = req.params.dni
    const alumnosData = req.body
    const indice = alumnos.findIndex( alumno=> alumno.dni == dni)
    if(indice >= 0){
       alumnos[indice].nombre = alumnosData.nombre
       alumnos[indice].tiene_Curso =
    !alumnosData.tiene_Curso? alumnosData.tiene_Curso:alumnos[indice].tiene_Curso
       res.status(201).json({ alumno: alumnos[indice]})
    }
        res.status(404).json({
            resultado: "La operacion no pudo ser realizada",
            mensaje: `El alumno con dni ${dni} no fue encontrado`
        
    })
}
 
module.exports = {
                    getAllAlumnos,
                    getAlumnoByDni, 
                    deletealumnoByDni,
                    createAlumno,
                    updateAlumno
                 }
