import passport from 'passport';
import passportLocal from 'passport-local';
const { Strategy } = passportLocal;



const strategy = new Strategy(async ( username, password, done) => {

    const response = await fetch('/posts/:' + username);
    console.log(response)

    try{
        const data = await response.json()
    }catch{
        return done(null, false, {message: 'Wrong username'})
    }

    if(password !== data.password){
        return done(null, false, { message: 'Wrong password'})
    }

    return done(null, username)

});

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((uid, done) => {
    done(null, uid);
  });
  
  export default {
    configure: (app) => {
      app.use(passport.initialize());
      app.use(passport.session());
    },
  
    authenticate: (domain, where) => {
      return passport.authenticate(domain, where);
    },
  };