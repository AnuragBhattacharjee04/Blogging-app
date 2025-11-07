const{schema,model} = require("mongoose");
const userSchema = new schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImageURL:{
        type:String,
        default:"/images/default.jpeg"
    },
    role:{
        type:String,
        enum:["User","Admin"],
        default:"User"
    }
},{timestamps:true});

const User = mongoose.model("user",userSchema);
module.exports = User;