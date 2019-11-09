import fetch from "isomorphic-unfetch";
import cheerio from "cheerio";

export default async function scrape(req, res) {
  try {
    const response = await fetch("https://news.ycombinator.com/");

    const page = await response.text();
    const $ = cheerio.load(page);

    let arr = [];
    $(".athing").each(function() {
      const articleId = $(this).attr("id");
      const title = $(this)
        .find(".storylink")
        .text();
      let link = $(this)
        .find(".storylink")
        .attr("href");

      link = link.match(
        /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
      )
        ? link
        : `https://news.ycombinator.com/${link}`;

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
