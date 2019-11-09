import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  body: { type: String },
  timestamp: { type: Date }
});

global.noteSchema = global.noteSchema || mongoose.model("Note", noteSchema);

export default global.noteSchema;
