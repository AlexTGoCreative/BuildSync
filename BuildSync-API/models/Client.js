import mongoose from "mongoose";
const { Schema } = mongoose;

const clientSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  dob: { type: Date },
  gender: { type: String, enum: ["male", "female", "other"] },
  maritalStatus: { type: String, enum: ["single", "married"] },
  image: { type: String }, // path to image in storage, optional
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
