import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  userEmail: { type: String, required: true },
  issue: { type: Date, required: true },
  return: { type: Date },
  dueDate: { type: Date, required: true },
});

export const Issue = mongoose.models?.Issue || mongoose.model("Issue", issueSchema);
