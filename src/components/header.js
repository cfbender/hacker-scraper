import Link from "next/link";

function Header({ user, loading }) {
  return (
    <header>
      <nav>
        <Link href="/">
          <a id="logo">://hacker-scraper</a>
        </Link>
        {!loading &&
          (user ? (
            <div className="links">
              <Link href="/saved">
                <a id="saved">Saved Articles</a>
              </Link>
              <a href="/api/logout">Logout</a>
            </div>
          ) : (
            <a href="/api/login">Login</a>
          ))}
      </nav>
      <style jsx global>
        {`
          @import url("https://fonts.googleapis.com/css?family=Ubuntu+Mono&display=swap");
        `}
      </style>

      <style jsx>{`
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem 0 2rem;
          margin: 1.5rem auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }

        #logo {
          font-family: "Ubuntu Mono", monospace;
          font-size: 28px;
        }

        #saved {
          margin-right: 3rem;
        }

        @media only screen and (max-width: 600px) {
          #logo {
            font-size: 16px;
          }
          #saved {
            margin-right: 0.3rem;
            margin-bottom: 0.3rem;
          }
          .links {
            margin-left: 0.5rem;
            display: flex;
            font-size: 12px;
            flex-direction: column;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
