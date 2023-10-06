const express = require('express')
const router = express.Router()

//controller
const ToughtController = require('../controllers/ToughtController')

router.get('/',ToughtController.showToughts)//de vex de ser req e res vai pegar o controller e chamar a função feita la no controlador

module.exports = router