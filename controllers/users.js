"use strict";

const passport = require("passport");

module.exports = function (_, passport, user, validator) {
  return {
    SetRouting: function (router) {
      router.get("/", this.indexPage);
      router.get("/signup", this.getSignUp);

      router.post(
        "/",
        [
          validator
            .check("email")
            .not()
            .isEmpty()
            .isEmail()
            .withMessage("Email is not valid"),
          validator
            .check("password")
            .not()
            .isEmpty()
            .isLength({ min: 5 })
            .withMessage(
              "Password is required and must be at least 5 characters"
            ),
        ],
        this.postValidation,
        this.postLogin
      );
      router.post(
        "/signup",
        [
          validator
            .check("username")
            .not()
            .isEmpty()
            .isLength({ min: 5 })
            .withMessage(
              "Username is required and must be at least 5 characters"
            ),
          validator
            .check("email")
            .not()
            .isEmpty()
            .isEmail()
            .withMessage("Email is not valid"),
          validator
            .check("password")
            .not()
            .isEmpty()
            .isLength({ min: 5 })
            .withMessage(
              "Password is required and must be at least 5 characters"
            ),
        ],
        this.postValidation,
        this.postSignUp
      );
    },

    indexPage: function (req, res) {
      const errors = req.flash("error");
      return res.render("index", {
        title: "Udemy Chat App",
        messages: errors,
        hasErrors: errors.length > 0,
      });
    },

    postLogin: passport.authenticate("local.login", {
      successRedirect: "/home",
      failureRedirect: "/signup",
      failureFlash: true,
    }),

    getSignUp: function (req, res) {
      const errors = req.flash("error");
      return res.render("signup", {
        title: "Udemy Chat App | Login",
        messages: errors,
        hasErrors: errors.length > 0,
      });
    },

    postValidation: function (req, res, next) {
      const err = validator.validationResult(req);
      const errors = err.array();
      const messages = [];
      errors.forEach((error) => {
        messages.push(error.msg);
      });

      req.flash("error", messages);

      return next();
    },

    postSignUp: passport.authenticate("local.signup", {
      successRedirect: "/home",
      failureRedirect: "/signup",
      failureFlash: true,
    }),
  };
};
