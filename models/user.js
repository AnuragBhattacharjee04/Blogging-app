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

userSchema.pre('saved',function(next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest('hex')

    this.salt = salt;
    this.password = hashedPassword;


    next();
})

const User = mongoose.model("user",userSchema);
module.exports = User;