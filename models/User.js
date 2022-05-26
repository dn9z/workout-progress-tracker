import mongoose from 'mongoose';
const {Schema, model} = mongoose;


const userSchema = new Schema({
  registrationDate:{type:Date, required:true}, // default:Date.now
  username:{type:String, required:true},
  email:{type:String, required:true, unique: true},
  password:{type:String, required:true},
  avatar:{type:String}
})


const User = model('users', userSchema);

export default User;

