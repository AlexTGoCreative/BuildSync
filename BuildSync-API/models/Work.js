import mongoose from "mongoose";
import { Schema } from "mongoose";

const workRequestSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  details: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  rejectionReason: { type: String },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const WorkRequest = mongoose.model("WorkRequest", workRequestSchema);
export default WorkRequest;