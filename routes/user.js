const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

const passport = require('passport')

const bcrySalt = new Promise((resolve)=>{
    bcrypt.genSalt(10, function(err, salt) {
        return resolve(salt)
    })
})

const bcryHash = (password, salt) => {
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, salt, function(err, hash) {
            return resolve(hash)
        })
    })
}

// 登入
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/users/login'
                                   })(req, res, next)
})

// 註冊
router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body
    let errors = []
    if (!name || !email || !password || !password2) {
        errors.push('所有欄位都是必填的')
    }

    if (password !== password2) {
        errors.push('兩次密碼錯誤')
    }

    if (errors.length > 0) {
        console.log('有錯')
        res.render('register', {
            error_msg: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        })
    } else {
        User.findOne({where:{email:email}})
        .then(user => {
            if (user) {
                errors.push('這個email註冊過了')
                res.render('register', {
                    name,
                    email,
                    password,
                    password2,
                    error_msg: errors
                })    
            } else {
                bcrySalt
                    .then((salt) => {
                        console.log('hash在這', bcryHash(password, salt))
                        return bcryHash(req.body.password, salt)
                    })
                    .then((hash) => {
                        
                        const newUser = new User({
                            name,
                            email,
                            password: hash
                        })
                        newUser
                            .save()
                            .then(user => {
                                res.redirect('/')
                            })
                            .catch(err => console.log(err))
                    })
            }  
        })
    }
    
    
    /*
    User.create({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => {res.redirect('/')})
    */
})

// 登出
router.get('/logout', (req,res) => {
    req.logout()
    req.flash('success_msg', '您已經登出')
    res.redirect('/users/login')
})

module.exports = router

