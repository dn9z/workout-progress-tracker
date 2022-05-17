import mongoose from 'mongoose';
const {Schema, model} = mongoose;


const workoutSchema = new Schema({
  _user:{type: Schema.Types.ObjectId, ref:'users'},
  _type:{type: Schema.Types.ObjectId, ref:'types'},
  date:{type:Date, required:true},
  data:{
    weights:{type:Number},
    sets:[{type:Number}],
    distance:{type:Number},
    rounds:[{type:String}]
  },
  note:{type:String},
})


const Order = model('workouts', workoutSchema);

export default Order;