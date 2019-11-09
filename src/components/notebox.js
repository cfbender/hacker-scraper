import React, { useState } from "react";

function NoteBox({ user, article, reload }) {
  const [noteText, updateNoteText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(`/api/data/notes`, {
      method: "PUT",
      body: JSON.stringify({
        userId: user.sub,
        articleId: article.articleId,
        note: noteText
      })
    });
    updateNoteText("");

    reload();
  }

  return (
    <>
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          className="note-box"
          type="text"
          value={noteText}
          onChange={e => updateNoteText(e.target.value)}
          placeholder="Enter a note"
        />
        <input className="note-submit" type="submit" value="Add Note" />
      </form>
      <style jsx>{`
        .note-form {
          display: flex;
          justify-content: space-around;
        }
        .note-submit,
        .note-box {
          margin: 0.2rem 2rem 0.2rem 2rem;
        }

        .note-box {
          width: 75%;
        }

        .note-submit {
          background-color: #333;
          color: white;
          font-size: 13px;
          font-family: "Ubuntu Mono", monospace;
          padding: 0.5rem;
          border-radius: 5px;
          border: none;
        }

        @media only screen and (max-width: 600px) {
          .note-form {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
        }
      `}</style>
    </>
  );
}

export default NoteBox;
