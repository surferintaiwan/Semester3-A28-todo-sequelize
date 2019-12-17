const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Todo = db.Todo
const {authenticated} = require('../config/auth.js')

// 顯示全部todo
router.get('/', authenticated, (req, res) => {
    res.render('index')
})



// 新增todo
router.get('/new', authenticated, (req, res) => {
    res.render('new')
})
router.post('/new', authenticated, (req, res) => {
    
})

// 顯示一筆todo
router.get('/:id', authenticated, (req, res) => {
    res.render('index')
})

// 更新todo
router.get('/:id/edit', authenticated, (req, res) => {
    console.log(123)
    res.render('edit')
})
router.put('/:id/edit', authenticated, (req, res) => {
})

// 刪除todo
router.delete('/:id/delete', authenticated, (req, res) => {
   
})

module.exports = router