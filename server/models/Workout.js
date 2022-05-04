import mongoose from 'mongoose';
const {Schema, model} = mongoose;


const workoutSchema = new Schema({
  date:{type:Date, required:true},
  notes:{type:String},
  type:{
    name:{type:String, required:true},
    category:{type:String, enum:['weights','bodyweight','distance'], required:true},

  },
  data:{
    // weights:{type:Number},
    // sets:[{type:Number}],
    // distance:{type:Number, required:false},
    // rounds:[{type:String}]
  },

  // _user:{type: Schema.Types.ObjectId, ref:'users'},
})


const Order = model('workouts', workoutSchema);

export default Order;