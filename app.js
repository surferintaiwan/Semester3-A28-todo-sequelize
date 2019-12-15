const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

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

// routes
app.get('/', (req, res) => {
    res.send('hello world')
})
app.use('/users', require('./routes/user.js'))


app.listen(3000, () => {
    console.log('its listenting')
})