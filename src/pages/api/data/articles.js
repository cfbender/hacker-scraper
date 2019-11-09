import connectDb from "../middleware/connectDbMiddleware.js";
import { Article, User } from "../../../models";

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
//              |_ {note: {String}, timestamp: {Date}}

// { "_id" : ObjectId("5dc5fbc17b02e12f8b223a68"), "id" : ObjectId("5dc5fbc17b02e12f8b223a67"), "notes" : [ ] }

const handler = async (req, res) => {
  const { method } = req;
  const reqBody = req.body ? JSON.parse(req.body) : undefined;

  switch (method) {
    //GETTING ALL USER ARTICLES
    case "GET":
      if (req.query.userId) {
        try {
          const response = await User.findOne({ userId: req.query.userId })
            .populate("articles")
            .populate("notes")
            .populate({ path: "notes", populate: "article" })
            .exec();
          res.status(200).json(response);
        } catch (error) {
          console.error(error);
        }
      }
      break;

    //ADDING NEW ARTICLE TO USER
    case "PUT":
      const newArticle = await Article.create({
        articleId: reqBody.articleId,
        title: reqBody.title,
        link: reqBody.link,
        commentLink: reqBody.commentLink
      });
      console.log(`Saving article: ${reqBody.articleId}`);
      await User.findOneAndUpdate(
        { userId: reqBody.userId },
        { $push: { articles: newArticle._id } },
        { new: true, upsert: true }
      ).exec();
      res.status(200).json({ good: true });
      break;

    //REMOVING ARTICLE FROM USER
    case "DELETE":
      console.log(`Deleting article: ${reqBody.articleId}`);
      const article = await Article.findOne({
        articleId: reqBody.articleId
      }).exec();

      await User.findOneAndUpdate(
        { userId: reqBody.userId },
        { $pull: { articles: article._id } }
      ).exec();

      res.status(200).json({ good: true });
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default connectDb(handler);
