const{Router}= require("express");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./Public/uploads/avatars/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/signin",(req,res)=>{
   return res.render('signin');
});

router.get("/signup",function(req,res){
   return res.render('Signup');

});

router.post('/signin', async function(req,res){
    try {
        const{email,password} = req.body;
    const token = await User.matchedPasswordAndGenerateToken(email,password);
    console.log("token" ,token);
    return res.cookie("token",token).redirect('/');
    } catch (error) {
        return res.render('signin',{
            error:"Incorrect email or password"
        });
        
    }
    
});
router.get("/logout",function(req,res){
    return res.clearCookie('token').redirect("/");
})

router.post('/signup',async(req,res)=>{
    const{fullname,email,password}=req.body;
    await User.create({
        fullname,
        email,
        password

    });

    return res.redirect('/');

});


router.get("/user/profile", (req, res) => {
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  return res.render("profile", {
    user: req.user,
  });
});


router.post("/user/profile", upload.single("profileImage"), async (req, res) => {
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  
  try {
    const profileImageURL = `/Images/default.jpeg/${req.file.filename}`;
    
    await User.findByIdAndUpdate(req.user._id, { profileImageURL });

    return res.redirect("/user/profile");
  } catch (error) {
    console.error(error);
    return res.render("profile", {
      user: req.user,
      error: "Failed to update profile picture.",
    });
  }
});



module.exports = router;


