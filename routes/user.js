const{Router}= require("express");
const User = require("../models/user");
const router = Router();

router.get("/signin",(req,res)=>{
   return res.render('signin');
});

router.get("/signup",function(req,res){
   return res.render('Signup');

});

router.post('/signin', async function(req,res){
    const{email,password} = req.body;
    const isMatched = await User.matchedPassword(email,password);
    console.log("successfuly matched user:" ,isMatched)

    
    return res.redirect('/');
});

router.post('/signup',async(req,res)=>{
    const{fullname,email,password}=req.body;
    await User.create({
        fullname,
        email,
        password

    });

    return res.redirect('/');

});

module.exports = router;


