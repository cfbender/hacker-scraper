import fetch from "isomorphic-unfetch";
import cheerio from "cheerio";

export default async function scrape(req, res) {
  try {
    const response = await fetch("https://news.ycombinator.com/");

    const page = await response.text();
    const $ = cheerio.load(page);
    let data = {};

    let id = 0;
    let arr = [];
    $(".athing").each(function() {
      const articleId = $(this).attr("id");
      const title = $(this)
        .find(".storylink")
        .text();
      const link = $(this)
        .find(".storylink")
        .attr("href");
      const commentLink = `https://news.ycombinator.com/item?id=${articleId}`;
      arr.push({
        id: articleId,
        title: title,
        link: link,
        commentLink: commentLink
      });
    });

    res.json(arr);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
