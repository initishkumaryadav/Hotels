const User = require('../models/user.js');
module.exports.signup=async(req, res) => {
return res.render("user/signup");
}
module.exports.signupForm=async (req,res,next) => {
    let {username, email, password} = req.body;
    const newUser = new User({username, email})
    const registeredUser = await User.register(newUser, password)
    req.login(registeredUser, (err) => {
        if(err) {
            return next(err)
        }
        req.flash('success', 'Welcome to Wonderlust :)')
       return res.redirect('/listings')
    })
}
module.exports.login=async(req, res) => {
    return res.render('user/login')
}
module.exports.logout=async(req, res,next) => {
    req.logout((err)=>{//inbuild logout method
        if(err){
            return next(err)
        }
        req.flash('success', 'you are logged out!')
        return res.redirect('/listings')
    })
}
module.exports.postLogin=async(req,res)=>{
    req.flash("success","Welcome to Jai Logic Hotels");
     const redirectUrl = res.locals.redirectUrl || '/listings'; 
   return res.redirect(redirectUrl);
    };