import React, { useState } from "react";

import Layout from "../components/layout";
import { useFetchUser } from "../lib/user";

import Article from "../components/article";

function Home() {
  const { user, loading } = useFetchUser();
  const [articles, updateArticles] = useState({
    "0": {
      id: 0,
      title: "NASA Flew Gas Detectors Above California, Found ‘Super Emitters’",
      link:
        "https://www.bloomberg.com/news/articles/2019-11-06/nasa-flew-gas-detectors-above-california-found-super-emitters",
      commentLink: "https://news.ycombinator.com/item?id=21482937",
      liked: false
    }
  });

  function toggleLiked(id) {
    let newArticles = { ...articles };
    newArticles[id].liked = !newArticles[id].liked;
    updateArticles(newArticles);
  }

  return (
    <Layout user={user} loading={loading}>
      {loading && <p>Loading articles...</p>}
      {!loading && (
        <Article
          id={articles[0].id}
          title={articles[0].title}
          link={articles[0].link}
          commentLink={articles[0].commentLink}
          toggleLiked={toggleLiked}
          user={user}
        ></Article>
      )}
    </Layout>
  );
}

export default Home;
