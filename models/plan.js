import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
  plan:{type:String,required:true},
  counts:{type:Number,required:false, default:0}
});

export default mongoose.model("Plans", userSchema);
