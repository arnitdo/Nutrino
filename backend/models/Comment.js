import mongoose from 'mongoose';

const { Schema } = mongoose;
const noteSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    about:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
  });
  
 const cmt =  mongoose.model('commentNote',noteSchema);
 export default cmt;