const mongoose = module.require('mongoose');
const bcrypt = module.require('bcrypt');

const users=mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minLength:[3,"must be at least 3 char"]

    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        validate:{
            validator:function(val){
                return /^[a-zA-Z0-9]{3,9}@(gmail|yahoo)(.com)$/.test(val)
            },
            message:()=>`invalid email or password`
        }


    },
    password:{
        type:String,
        required:[true,"password is required"],
        validate:{
            validator:function(val){
                return /^[a-zA-Z0-9]{3,15}[@.?-_=]/.test(val)
            },
            message:()=>`invalid email or password`
        }
        

    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },



})

users.pre('save',async function(next){

    let salt=await bcrypt.genSalt(10);
    let hashed=await bcrypt.hash(this.password,salt)
    this.password=hashed
    next();

})


const modelofusers =mongoose.model("users",users)

module.exports=modelofusers;
