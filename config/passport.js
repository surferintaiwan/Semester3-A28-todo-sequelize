const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const db = require('../models')
const User = db.User

module.exports = passport => {
    passport.use(new LocalStrategy({usernameField: 'email'},
        (email, password, done) => {
          User.findOne({where:{email: email}})
              .then(user => {
                  if (!user) {
                    return done(null, false, { message: '帳號不存在' })
                  }
                  if (user.password !== password) {
                      return done(null, false, { message: '帳號或密碼錯誤' })
                  }
                  return done(null, user)
              })
          }
      ))
      passport.serializeUser(function(user, done) {
        done(null, user.id);
      })
      
      passport.deserializeUser(function(id, done) {
        User.findByPk(id).then(user => {
            done(null, user)
        })
      })
}
