import mongoose from 'mongoose'

const { Schema } = mongoose;
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    allergies:{
        type:[String],
        required:false
    },
    prefers:{
        type:[String],
        required:false
    },
    avoids:{
        type:[String],
        required:false
    },
    height:{
        type:Number,
        required:false
    },
    weight:{
        type:Number,
        required:false
    },
    age:{
        type:Number,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    },
  });

  const userModel =  mongoose.model('testuser',userSchema);

  export default userModel;