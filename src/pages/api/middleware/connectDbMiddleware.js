import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/hacker-scraper";

const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    // Using new database connection
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  }
  return handler(req, res);
};
export default connectDb;
