# Hacker Scraper

## Preface

I love [hacker news](https://news.ycombinator.com/), but don't love the website. I created a simple scraper that grabs the front page, and allows you to save articles and save notes on saved articles.

The application scrapes articles from the front-page of hacker news regardless of sign-in, but if you are signed in, you can save articles and notes on articles. Happy reading!

## How it's built

This app is built using [Next.js](https://github.com/zeit/next.js/) to bootstrap a React project with server-side rendering and a serverless API. It uses MongoDB for the database, and auth0 for authentication.

## Local development

Clone this repository using git and run the following commands:

```bash
    cd src && yarn -yq
    yarn dev
```


