import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import Layout from "../components/layout";
import { useFetchUser } from "../lib/user";

import Article from "../components/article";

function Home() {
  const { user, loading } = useFetchUser();
  const [articles, updateArticles] = useState({});

  function toggleLiked(id) {
    let newArticles = { ...articles };
    newArticles[id].liked = !newArticles[id].liked;
    updateArticles(newArticles);
  }

  useEffect(() => {
    const scrape = async () => {
      const data = await fetch("/api/scrape");
      return data.json();
    };

    scrape().then(data => updateArticles(data));
  }, []);
  return (
    <Layout user={user} loading={loading}>
      {loading && <p>Loading articles...</p>}
      {!user && <p>Login to save articles and store notes!</p>}
      {!loading &&
        Object.keys(articles).map(prop => (
          <Article
            key={articles[prop].id}
            id={prop}
            postId={articles[prop].id}
            title={articles[prop].title}
            link={articles[prop].link}
            commentLink={articles[prop].commentLink}
            toggleLiked={toggleLiked}
            user={user}
          ></Article>
        ))}
    </Layout>
  );
}

export default Home;
