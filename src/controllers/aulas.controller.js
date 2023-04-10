const aulas = require ('../../datos/aulas.json')
const getAllAulas = (req , res)=>{
    res.status(200).json(aulas)
}

const getAulasById = (req, res)=>{ 
    const id = req.params.id
    const indice = aulas.findIndex( aula => aula.id == id)
    if(indice == -1){
        res.status(404).json({
            mensaje: `El aula con id ${id} no fue encontrado`

        })
    }else{
        res.status(200).json(
            aulas[indice]
        )
        }
       
    }


module.exports = {getAllAulas, getAulasById}