import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskName: String,
  subject: String,
  estimatedTime: String,
  priority: String,
  status: { type: String, default: "pending" },
});

export default mongoose.model("Task", taskSchema);
