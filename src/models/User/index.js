import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: String,
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }]
});

global.userSchema = global.userSchema || mongoose.model("User", userSchema);

export default global.userSchema;
