import React, { useState, useEffect } from "react";
import { useFetchUser } from "../lib/user";
import Layout from "../components/layout";

import Article from "../components/article";
import NoteBox from "../components/notebox";

function SavedArticles({ user }) {
  const [articles, updateArticles] = useState([]);
  const [userArticles, updateUserArticles] = useState([]);
  const [notes, setNotes] = useState([]);

  // gets user saved articles and updates
  const scrape = async () => {
    const result = await fetch(`/api/data/articles?userId=${user.sub}`);
    const data = await result.json();
    setNotes(data.notes);
    updateArticles(data.articles);

    const userArticleIds = data.articles.map(article => article.articleId);
    updateUserArticles(userArticleIds);
  };

  //
  useEffect(() => {
    scrape();
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
      {!articles.length && (
        <p>
          Go back to the home page and like some articles to save and take
          notes!
        </p>
      )}
      {articles.map(article => (
        <Article
          key={article.articleId}
          id={article.articleId}
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
                  Delete
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
          color: white;
          font-size: 12px;
          font-family: "Ubuntu Mono", monospace;
          display: flex;
          justify-content: center;
          background-color: #333;
          border-radius: 5px;
          border: none;
        }

        @media only screen and (max-width: 600px) {
          .note-time {
            display: none;
          }
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
