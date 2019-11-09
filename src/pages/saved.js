import React, { useState, useEffect } from "react";
import { useFetchUser } from "../lib/user";
import Layout from "../components/layout";

import Article from "../components/article";
import NoteBox from "../components/notebox";

function SavedArticles({ user }) {
  const [articles, updateArticles] = useState([]);
  const [userArticles, updateUserArticles] = useState([]);
  const [notes, setNotes] = useState([]);

  const scrape = async () => {
    const result = await fetch(`/api/data/articles?userId=${user.sub}`);
    const data = await result.json();
    setNotes(data.notes);
    updateArticles(data.articles);
  };

  useEffect(() => {
    scrape().then(async () => {
      const response = await fetch(`/api/data/articles?userId=${user.sub}`);
      const userArticles = await response.json();
      const userArticleIds = Object.keys(userArticles).map(
        prop => userArticles[prop].id
      );
      updateUserArticles(userArticleIds);
    });
  }, []);

  async function deleteNote(e) {
    e.preventDefault();
    await fetch(`/api/data/notes`, {
      method: "DELETE",
      body: JSON.stringify({
        userId: user.sub,
        noteId: e.target.dataset.noteid
      })
    });

    scrape();
  }

  return (
    <>
      {articles.map(article => (
        <Article
          key={article.articleId}
          articleId={article.articleId}
          title={article.title}
          link={article.link}
          commentLink={article.commentLink}
          user={user}
          userArticles={userArticles}
        >
          {notes
            .filter(note => note.article.articleId === article.articleId)
            .map(note => (
              <div key={note._id} className="notes">
                <p className="note-time">
                  {new Date(note.timestamp).toLocaleString()}
                </p>
                <p className="note-body">{note.body}</p>
                <button
                  className="note-trash"
                  data-noteid={note._id}
                  onClick={deleteNote}
                >
                  🗑️
                </button>
              </div>
            ))}

          <NoteBox user={user} article={article} reload={scrape} />
        </Article>
      ))}
      <style jsx>{`
        .notes {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .note-body {
          border: 1px solid #ccc;
          max-width: 75%;
          min-width: 50%;
          text-align: center;
          border-radius: 4px;
        }
        .note-time {
          margin-left: 0;
          font-size: 10px;
        }
        .note-trash {
          font-size: 10px;
          display: flex;
          justify-content: center;
          padding: 0.15rem;
          max-width: 0.5rem;
        }
      `}</style>
    </>
  );
}

function Saved() {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout user={user} loading={loading}>
      {loading ? <>Loading...</> : <SavedArticles user={user} />}
    </Layout>
  );
}

export default Saved;
