const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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

module.exports = passport => {
    passport.use(new LocalStrategy({usernameField: 'email'},
        (email, password, done) => {
          User.findOne({where: {email: email}})
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

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
      },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({where: {email: profile._json.email}})
                .then((user) => {
                    if (!user) {
                        let randomPassword = Math.random().toString(36).slice(-8)
                        bcrySalt
                            .then((salt) => {
                                return bcryHash(randomPassword, salt)
                            })
                            .then((hash) => {
                                const newUser = new User({
                                    name: profile._json.name,
                                    email: profile._json.email,
                                    password: hash 
                                })
                                newUser.save()
                                    .then((user) => {
                                        return done(null, user)
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                    } else {
                        return done(null, user)
                    }
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
