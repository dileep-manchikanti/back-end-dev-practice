const passport=require('passport');
const User = require('./users');
var localStrategy=require('passport-local').Strategy;
var user=require('./users');

exports.local=passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());