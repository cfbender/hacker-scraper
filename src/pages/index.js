import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import Layout from "../components/layout";
import { useFetchUser } from "../lib/user";

import Article from "../components/article";

function Home() {
  const { user, loading } = useFetchUser();
  const [articles, updateArticles] = useState([]);
  const [userArticles, updateUserArticles] = useState([]);

  // loads articles from scraper API
  useEffect(() => {
    const scrape = async () => {
      const response = await fetch("/api/scrape");
      const data = await response.json();
      return data;
    };

    scrape().then(data => {
      updateArticles(data);
    });
  }, []);

  // checks if any articles shown were already liked by the user and updates accordingly
  useEffect(() => {
    const checkLiked = async () => {
      if (user) {
        const response = await fetch(`/api/data/articles?userId=${user.sub}`);
        const userArticles = await response.json();
        const userArticleIds = userArticles.articles.map(
          article => article.articleId
        );
        updateUserArticles(userArticleIds);
      }
    };

    checkLiked();
  }, [user, loading]);

  return (
    <Layout user={user} loading={loading}>
      {loading && <p>Loading articles...</p>}
      {!user && <p>Login to save articles and store notes!</p>}
      {!loading &&
        articles.map(article => (
          <Article
            key={article.id}
            id={article.id}
            title={article.title}
            link={article.link}
            commentLink={article.commentLink}
            user={user}
            userArticles={userArticles}
          ></Article>
        ))}
    </Layout>
  );
}

export default Home;
