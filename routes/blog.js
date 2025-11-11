const{Router}= require("express");
const multer = require("multer");
const Blog = require("../models/blog");
const path = require("path");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./Public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null,fileName)
  }
});

const upload = multer({ storage: storage });

router.get("/add-blog",function(req,res){
    return res.render("addblog",{
        user:req.user,
    });
});

router.post("/",upload.single('coverImage'),async (req,res)=>{
    const{body,title} = req.body;
    const blog =  await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`

    })
    
    return res.redirect(`/blog/${blog._id}`);

});


// ... (all your other routes like /add-blog and /) ...

// NEW ROUTE TO VIEW A SINGLE BLOG POST
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
                                .populate("createdBy");
        
        if (!blog) {
            return res.status(404).render("404"); 
        }

        return res.render("blog", {
            user: req.user,
            blog: blog,
        });
    } catch (error) {
        console.error(error);
        return res.redirect("/");
    }
});



module.exports = router;
