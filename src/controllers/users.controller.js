const usersCtrl = {};

const User = require('../models/User');

const passport = require('passport');

// Crear cuenta
usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    let errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: "No coincide las contraseñas" });
    }
    if (password.length < 4) {
        errors.push({ text: "La contraseña debe tener mas de 4 caracteres" });
    }
    if (errors.length > 0) {
        res.render("users/signup", {
            errors,
            name,
            email,
            password,
            confirm_password
        })
    } else {
       const emailUser =  await User.findOne({email});
       if(emailUser){
           req.flash( "error_msg",  "Ya heciste una centa cn este email");
           res.redirect('/signup')
       } else {
          const newUser = new User({name, email, password});
          newUser.password = await newUser.encryptPassword(password)
          await newUser.save();
          req.flash('sucess_msg', "You are registre")
          res.redirect('/signin');
       }
    }
};

// loading usuario
usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin')
}

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/signin",
    failureFlash: true
  });

//Cerra sesion
usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('sucess_msg', 'Acabas de cerrar session');
    res.redirect('/signin')
}

module.exports = usersCtrl;