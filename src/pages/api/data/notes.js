import connectDb from "../middleware/connectDbMiddleware.js";
import { Note, User, Article } from "../../../models";

// GET: hit with user ID, return list of saved articles with notes
// POST: hit with user ID and note body
// Data Structure:
//  Users {Map}
//   |_ userId {string}
//      |_ articles {Array of {id, notes}}
//          |_ id {string, map to Article schema}
//              |_ articleId {String}
//              |_ title {String}
//              |_ link {String}
//              |_ commentLink {String}
//          |_ notes {Array}
//              |_ {body: {String}, timestamp: {Date}}

// { "_id" : ObjectId("5dc5fbc17b02e12f8b223a68"), "id" : ObjectId("5dc5fbc17b02e12f8b223a67"), "notes" : [ ] }

const handler = async (req, res) => {
  const { method } = req;
  const reqBody = req.body ? JSON.parse(req.body) : undefined;

  switch (method) {
    //ADDING NEW NOTE TO ARTICLE
    case "PUT":
      const user = await User.findOne({ userId: reqBody.userId }).exec();
      let article = await Article.findOne({
        articleId: reqBody.articleId
      }).exec();
      console.log(
        `Adding note to article ${reqBody.articleId} with text ${reqBody.note}`
      );
      const newNote = await Note.create({
        user: user._id,
        article: article._id,
        body: reqBody.note,
        timestamp: Date.now()
      });
      await User.findOneAndUpdate(
        { userId: reqBody.userId },
        { $push: { notes: newNote._id } }
      ).exec();
      res.status(200).json({ noteId: newNote._id });
      break;

    //REMOVING NOTE FROM ARTICLE
    case "DELETE":
      console.log(`Deleting note: ${reqBody.noteId}`);
      await Note.deleteOne({
        _id: reqBody.noteId
      }).exec();

      await User.findOneAndUpdate(
        { userId: reqBody.userId },
        { $pull: { notes: reqBody.noteId } }
      ).exec();

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default connectDb(handler);
