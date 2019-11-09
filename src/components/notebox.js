import React, { useState } from "react";

function NoteBox({ user, article, reload }) {
  const [noteText, updateNoteText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    await fetch(`/api/data/notes`, {
      method: "PUT",
      body: JSON.stringify({
        userId: user.sub,
        articleId: e.target.dataset.article,
        note: noteText
      })
    });
    updateNoteText("");

    reload();
  }

  return (
    <>
      <input
        className="note-box"
        type="text"
        value={noteText}
        onChange={e => updateNoteText(e.target.value)}
        placeholder="Enter a note"
      />
      <input
        data-article={article.articleId}
        className="note-submit"
        type="submit"
        value="Add Note"
        onClick={handleSubmit}
      />
      <style jsx>{`
        .note-submit,
        .note-box {
          margin: 0.2rem 2rem 0.2rem 2rem;
        }
      `}</style>
    </>
  );
}

export default NoteBox;
