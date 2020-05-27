const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User =require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    // Comprobar el email del usuario
        //Si el gmail existe se guarda en una constante user
        const user = await User.findOne({email: email});
        //De lo contrario muestra un mensaje de error
    if(!user){
        return done(null, false, { message: 'No exite el Usuario'});
        }
        // Si el gmail es true comprobamos otras condiciones
        else {
            //comprobando la contraseña del usuario 
                //Si el contraseña coincide guadarla en una contante match
           const match = await user.matchPassword(password);

            //Si el email y la contraseña coincide y no exite errores muestra usuario en el servidor 
            if(match) {
                return done(null, user)
            } 
            //de lo contrario la contraseña no coincide el user es false por lo que muestra un mensaje
            else {
                return done(null, false, {message: 'Contraseña invalida'})
            }
        }
}));

//cuando el usuario sea registrado se guardar en nuestra session
passport.serializeUser((user, done) => {
    done(null, user.id);
});
  

//cuando el usurio comienza a navegar se analiza el id si tiene permiso o existe
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
});

module.exports = passport;