import mongoose from 'mongoose';
const {Schema, model} = mongoose;


const workoutSchema = new Schema({
  _user:{type: Schema.Types.ObjectId, ref:'users'},
  _type:{type: Schema.Types.ObjectId, ref:'types'},
  date:{type:Date, required:true},
  data:{
    weights:{type:Number, required:false},
    sets:[{type:Number, required:false}],
    distance:{type:Number, required:false},
    rounds:[{type:String, required:false}]
  },
  note:{type:String},
})


const Workout = model('workouts', workoutSchema);

export default Workout;