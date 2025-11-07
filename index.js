const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

app.set("view engine",'ejs');
app.set('Views',path.resolve('./views'));
app.listen(port,()=>console.log("server started on port successfuly")); 