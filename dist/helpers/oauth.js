"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { User } = require('../models');
passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback",
    passReqToCallback: true,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, function (profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = profile.email;
        const existingUser = yield User.findOne({ where: { email: email } });
        if (existingUser) {
            const user = existingUser.dataValues;
            const token = generateAccessToken({
                id: user,
                email: user.email,
                password: user.password,
                role: user.role
            });
            done(null, token);
        }
        else {
            const newUser = yield User.create({
                name: profile.displayName,
                email: email,
                password: 'test123414!',
                role: 'customer'
            }, {});
            const user = newUser.dataValues;
            const token = generateAccessToken({
                id: user,
                email: user.email,
                password: user.password,
                role: user.role
            });
            done(null, token);
        }
        done(null, profile);
    });
}));
passport.serializeUser(() => (user, done) => {
    console.log({ user });
    done(null, {});
});
