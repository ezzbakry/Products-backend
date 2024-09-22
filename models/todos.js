const mongoose = module.require('mongoose');


const todos=mongoose.Schema(
    {
        title:{
            type: String,
            required: [true,"title is required"],
            unique:true
        },
        status:{
            type:String,
            enum:["in progress","done","todo"],
            default:"todo"
        },
        userId:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"users"
        }
    }
)

const model=mongoose.model("Todo",todos)
module.exports=model;

