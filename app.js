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

app.get('/',(req, res) => {
    res.render('index')
})

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

app.listen(3000, () => {
    console.log('its listenting')
})