const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {

})


router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body
    User.findOne({where:{email:email}})
        .then(user => {
            if (user) {
                console.log('User already exists')
                res.render('register', {
                    name,
                    email,
                    password,
                    password2
                })    
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                })
                newUser
                    .save()
                    .then(user => {
                        res.redirect('/')
                    })
                    .catch(err => console.log(err))
            }
        })
    /*
    User.create({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => {res.redirect('/')})
    */
})


module.exports = router

