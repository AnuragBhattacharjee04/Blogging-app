const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const mongoose = require('mongoose');
const app = express();
const port = 8000;
mongoose.connect("mongodb://localhost:27017/venn").then((e)=>console.log("Mongodb connected"));
app.set("view engine",'ejs');
app.set('Views',path.resolve('./views'));
app.get('/',function(req,res){
    res.render('home');
});
app.use(express.urlencoded({extended:false}));
app.use('/user',userRoute);
app.listen(port,()=>console.log("server started on port successfuly")); 