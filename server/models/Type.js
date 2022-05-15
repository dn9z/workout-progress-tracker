import mongoose from 'mongoose';
const {Schema, model} = mongoose;


const typeSchema = new Schema({
    name:{type:String, required:true, unique:true},
    category:{type:String, enum:['weights','bodyweight','distance'], required:true},
    _user:{type: Schema.Types.ObjectId, ref:'users'},
})


const Type = model('types', typeSchema);

export default Type;