import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  articleId: String,
  title: String,
  link: String,
  commentLink: String
});

global.articleSchema =
  global.articleSchema || mongoose.model("Article", articleSchema);

export default global.articleSchema;
