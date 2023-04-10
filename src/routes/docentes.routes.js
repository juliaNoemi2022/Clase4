const  express = require('express')
const docentesController = require('../controllers/docentes.controller')

const router = express.Router()



router.get('/', docentesController.getAllDocentes)
router.get('/:legajo', docentesController.getDocentesByLegajo )
router.delete('/:legajo',docentesController.deleteDocentesByLegajo) 
router.post('/', docentesController.createDocente)
router.put('/:legajo',docentesController.updateDocente)

module.exports = { router}
