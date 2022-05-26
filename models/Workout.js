import mongoose from 'mongoose';
const {Schema, model} = mongoose;


const workoutSchema = new Schema({
  _user:{type: Schema.Types.ObjectId, ref:'users'},
  _type:{type: Schema.Types.ObjectId, ref:'types'},
  date:{type:Date, required:true},
  data:{
    weights:{type:Number},
    // sets:[{type:Number}],
    sets:{type:[{type:Number}],default:undefined},

    distance:{type:Number},
    // rounds:[{type:String, default:undefined}]
    rounds:{type:[{type:String}],default:undefined}
  },
  note:{type:String},
})


const Order = model('workouts', workoutSchema);

export default Order;