import mongoose from 'mongoose';

const { Schema } = mongoose;
const noteSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    steps:[{
        equipment:[{
            type:String
        }],
        ingredients:[{
            type:String
        }],
        number:{
            type:Number,
            required:false
        },
        step:{
            type:String,
            required:false
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
  });
  
 export default mongoose.model('testnote',noteSchema);