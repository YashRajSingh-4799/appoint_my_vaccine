import mongoose from 'mongoose';
const { Schema } = mongoose;


const hospitalschema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    distence:{
        type: String,
        required: true,
    },
    photo:{
        type: [String],
    },
    desc:{
        type: String,
        required: true,
    },
    rating:{
        type: String,
        mini:0,
        max:5,
    },
    vaccinator:{
        type: [String],
    },
    Amount :{
        type: Number,
        required: true,
    },
    featured:{
        type: Boolean,
        default: false,
    },
})


export default mongoose.model("Hospital", hospitalschema)