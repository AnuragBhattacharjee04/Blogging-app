const{Schema,model} = require("mongoose");
const {createHmac,randomBytes}= require('node:crypto');
const userSchema = new Schema({
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

userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest('hex')

    this.salt = salt;
    this.password = hashedPassword;


    next();
});
userSchema.static("matchedpassword",function(email,password){
    user = this.findOne({email});
    if(!user) return false;


    const salt = user.salt;
    const password = user.hashedPassword;

    const providedpassword = createHmac("sha256",salt)
        .update(password)
        .digest('hex')
    
        return hashedPassword=== providedpassword;

})

const User = model("user",userSchema);
module.exports = User;