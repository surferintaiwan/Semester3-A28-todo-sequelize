const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    console.log(req.body)
})


router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    User.create({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => {res.redirect('/')})
})


module.exports = router

