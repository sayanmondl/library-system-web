import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    issues: { type: Array },
    currentlyIssued: { type: Array },
    createdAt: { type: String },
    role: { type: String, default: "user" }
})

export const User = mongoose.models?.User || mongoose.model('User', userSchema);