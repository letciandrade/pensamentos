const express = require('express')
const router = express.Router()

// controlador da rota
const Authcontroller = require('../controllers/AuthController')

router.get('/login', Authcontroller.login)
router.get('/register', Authcontroller.register)
router.post('/register', Authcontroller.registerPost)
router.post('/logout', Authcontroller.logout)

module.exports = router