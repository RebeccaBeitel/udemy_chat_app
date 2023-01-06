"use strict";

const passport = require("passport");

module.exports = function (_, passport, user, validator) {
  return {
    SetRouting: function (router) {
      router.get("/", this.indexPage);
      router.get("/signup", this.getSignUp);
      router.get("/home", this.homePage);

      // router.post("/signup", user.SignUpValidation, this.postSignUp);
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
      return res.render("index");
    },

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
      console.log(err);
    },

    postSignUp: passport.authenticate("local.signup", {
      successRedirect: "/home",
      failureRedirect: "/signup",
      failureFlash: true,
    }),

    homePage: function (req, res) {
      return res.render("home");
    },
  };
};
