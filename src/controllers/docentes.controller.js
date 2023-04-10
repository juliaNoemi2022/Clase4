const docentes = require('../../datos/docentes.json') 

const getAllDocentes = (req, res)=>{
    res.status(200).json(docentes)
}

const getDocentesByLegajo = (req, res)=>{
    const legajo = req.params.legajo
    const resultado = docentes.find( docente => docente.legajo == legajo )
    if(resultado){
        res.status(200).json(resultado)
    }else{
        res.status(404).json({
            mensaje: `El docente con legajo ${legajo} no fue encontrado`
        })
    }
}

const deleteDocentesByLegajo = (req, res)=> {
    const legajo = req.params.legajo
    const indice = docentes.findIndex( docente => docente.legajo == legajo)
    if( indice == -1){
        res.status(404).json({
            resultado: "La operacion no pudo realizarse con exito",
            mensaje: `El docente cuyo legajo es ${legajo} no pudo ser encontrado`
        })
    }else{
        const docente = docentes[indice];
        const resultado = docentes.splice(indice, 1)
        res.status(200).json({
            resultado: "La operacion pudo realizarse con exito",
            docente: docente
        })
    }
}

const createDocente = (req, res) => {
    const docentesData = req.body
    const existe = docentes.find(docente => docente.legajo == docentesData.legajo)
    if (!existe) {
        if( ! docentesData.concursado)
            alumnosData.concursado = false
    
        if (!docentesData.nombre) {
            res.status(400).json({mensaje: `No se puede generar el docente con legajo ${docentesData.legajo} por no tener nombre`})    
        } else  {
            docentes.push(docentesData)
            res.status(201).json({mensaje: `El docente con legajo ${docentesData.legajo} fue creado correctamente`})
        }
    } else {
        res.status(400).json({mensaje: `El docente con legajo ${docentesData.legajo} ya existe en la base de datos`})
    }
}

const updateDocente = (req, res)=>{
    const legajo = req.params.legajo  
    const docentesData = req.body 
    const indice = docentes.findIndex(docente => docente.legajo == legajo)
    if ( indice >= 0 ) {
        docentes[indice].nombre = docentesData.nombre
        if (docentesData.concursado!==undefined) {
            docentes[indice].concursado = docentesData.concursado 
        }
        res.status(201).json({"docente": docentes[indice]})
    }
    else {
        res.status(404).
        json(
            {
                resultado: "La operación de modicar no pudo ser realizada",
                mensaje: `El docente con legajo ${legajo} no fue encontrado`
            }
        )
    }
}


module.exports ={
                 getAllDocentes,
                 getDocentesByLegajo,
                 deleteDocentesByLegajo,
                 createDocente,
                 updateDocente
                }
