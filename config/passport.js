const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

const bcryCompare = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function(err, res) {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

module.exports = passport => {
    passport.use(new LocalStrategy({usernameField: 'email'},
        (email, password, done) => {
          User.findOne({where:{email: email}})
              .then(user => {
                  if (!user) {
                    return done(null, false, { message: '帳號不存在' })
                  }
                  bcryCompare(password, user.password)
                    .then((res) => {
                      if (res) {
                        return done(null, user)
                      } else {
                        return done(null, false, { message: '帳號或密碼錯誤' })
                      }
                    })
                    .catch((err) => {throw err})
              })
          }
      ))
      passport.serializeUser(function(user, done) {
        done(null, user.id)
      })
      
      passport.deserializeUser(function(id, done) {
        User.findByPk(id).then(user => {
            done(null, user)
        })
      })
}
