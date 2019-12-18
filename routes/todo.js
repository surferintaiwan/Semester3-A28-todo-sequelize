const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Todo = db.Todo
const {authenticated} = require('../config/auth.js')

// 顯示全部todo
router.get('/', authenticated, (req, res) => {
    User.findByPk(req.user.id)
        .then((user)=>{
            if (!user) {throw new Error("user not found")}
            return Todo.findAll({
                where :{UserId : req.user.id}
            })
        })
        .then((todos) => { return res.render('index', {todos:todos}) 
        })
        .catch((error) => { return res.status(422).json(error) })
})

// 新增todo
router.get('/new', authenticated, (req, res) => {
    res.render('new')
})

router.post('/new', authenticated, (req, res) => {
    const newTodo = new Todo({
        name: req.body.name,
        UserId: req.user.id
    })
    newTodo.save()
            .then((todo) => {
                return res. redirect('/')})
            .catch((error) => { return res.status(422).json(error)})
})

// 顯示一筆todo
router.get('/:id', authenticated, (req, res) => {
    User.findByPk(req.user.id)
        .then((user) => {
            if (!user) {throw new Error("user not found")}
            return Todo.findOne({where: {
                UserId: req.user.id,
                id: req.params.id    
            }})
        })
        .then((todo) => {return res.render('detail',{todo: todo})})
        .catch((error) => { return res.status(422).json(error)})
})

// 顯示一筆todo編輯頁面
router.get('/:id/edit', authenticated, (req, res) => {
    User.findByPk(req.user.id)
        .then((user) => {
            if (!user) {throw new Error("user not found")}
            return Todo.findOne({where: {
                userId: req.user.id,
                id: req.params.id
            }})
        })
        .then((todo) => {return res.render('edit', {todo: todo})})
        .catch((error) => { return res.status(422).json(error)})
})

// 儲存編輯後的todo
router.put('/:id', authenticated, (req, res) => {
    User.findByPk(req.user.id)
        .then((user) => {
            if (!user) {throw new Error("user not found")}
            return Todo.findOne({where:{
                userId: req.user.id,
                id: req.params.id
            }})
        })
        .then((todo) => {
            todo.name = req.body.name
            todo.done = req.body.done === 'on'
            return todo.save()
        })
        .then((todo) => {return res.redirect(`/todos/${todo.id}`)})
        .catch((error) => { return res.status(422).json(error)})
})

// 刪除todo
router.delete('/:id', authenticated, (req, res) => {
    User.findByPk(req.user.id)
        .then((user) => {
            if (!user) {throw new Error("user not found")}
            return Todo.destroy({where: {
                UserId: req.user.id,
                id: req.params.id
            }})
        })
        .then((todo)=>{return res.redirect('/')})
        .catch((error) => { return res.status(422).json(error)})
})

module.exports = router