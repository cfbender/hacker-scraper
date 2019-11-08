import React, { useState, useEffect } from "react";

const Article = props => {
  const [liked, updateLiked] = useState("🖤");

  function handleToggle(e) {
    props.toggleLiked(props.id);
    liked === "🖤" ? updateLiked("❤️") : updateLiked("🖤");
  }

  useEffect(() => {
    props.liked ? updateLiked("liked") : null;
  }, []);

  return (
    <div className="article-container">
      <a className="title" href={props.link}>
        {props.title}{" "}
        <span className="domain">
          {`
            (${
              props.link.match(
                /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
              )[0]
            })

          `}
        </span>
      </a>
      <div className="buttons">
        <a className="comment-link" href={props.commentLink}>
          <div className="Y-logo">Y</div> comments
        </a>

        {props.user && (
          <button className="heart" onClick={handleToggle}>
            {liked}
          </button>
        )}
      </div>

      {/* Include children for note box */}
      {props.children}

      <style jsx>
        {`
          .article-container {
            display: flex;
            flex-direction: column;
            max-width: 60rem;
            min-height: 4rem;
            margin: 0.3rem;
            -webkit-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.75);
            box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.75);
          }
          .title {
            padding: 10px;
            color: #4a4a4a;
            text-decoration: none;
          }
          .domain {
            font-size: 10px;
            color: #555;
          }

          .buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .Y-logo {
            display: inline;
            text-align: center;
            padding: 0rem 0.3rem 0rem 0.3rem;
            border: 1px solid white;
            background-color: #ff6600;
          }
          .comment-link {
            font-size: 12px;
            max-height: 1rem;
            max-width: 5rem;
            border-radius: 4px;
            background-color: #333;
            color: #fff;
            text-decoration: none;
            padding: 0.3rem;
            margin: 0.3rem;
          }
          .heart {
            display: flex;
            justify-content: center;
            max-width: 1rem;
            font-size: 14px;
            padding: 2px;
            margin: 0.3rem;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default Article;
