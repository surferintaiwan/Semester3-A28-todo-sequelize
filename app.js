const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

const db = require('./models')
const Todo = db.Todo
const User = db.User

// 設定handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// 設定body-parser
app.use(bodyParser.urlencoded({ extended: false }))

// 設定override
app.use(methodOverride('_method'))

// 設定express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// 設定passport
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// 儲存變數供view使用
app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

// routes
app.use('/', require('./routes/home.js'))
app.use('/users', require('./routes/user.js'))
app.use('/todos', require('./routes/todo.js'))


app.listen(3000, () => {
    console.log('its listenting')
})