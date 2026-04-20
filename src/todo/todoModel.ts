import mongoose, { mongo } from "mongoose";
import { Status, type Itodo } from "./todoTypes.js";
const schema = mongoose.Schema

const todoSchema = new schema<Itodo>({
   task : String,
   deadline : String,
   stauts :{
    type :String,
    enum:[
        Status.Completed, Status.Pending
    ],
    default : Status.Pending
   }
})

export default mongoose.model("Todo",todoSchema)