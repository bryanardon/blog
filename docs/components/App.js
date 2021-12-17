import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import { SignIn, SignOut, useAuthentication } from "../services/authService";
import {
  fetchArticles,
  createArticle,
  deleteArticle,
} from "../services/articleService";
import "./App.css";
import { auth } from "../firebaseConfig";
export const me = "daRLYi78K7h2b1aL1Kx5l0LjN3F2";
export default function App() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [writing, setWriting] = useState(false);
  const user = useAuthentication();

  // This is a trivial app, so just fetch all the articles only when
  // a user logs in. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    if (user) {
      fetchArticles().then(setArticles);
    }
  }, [user]);

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body }) {
    createArticle({ title, body }).then((article) => {
      setArticle(article);
      setArticles([article, ...articles]);
      setWriting(false);
    });
  }

  function removeArticle(id) {
    deleteArticle(id).then(() => {
      setArticle(null);
      setArticles(articles.filter((a) => a.id !== id));
      setWriting(false);
    });
  }
  return (
    <>
      <div className="App">
        <header>
          Blog
          {user && <SignOut />}
          {user && auth.currentUser.uid == me && (
            <button id="add" onClick={() => setWriting(true)}>
              New Article
            </button>
          )}
        </header>

        {!user ? "" : <Nav articles={articles} setArticle={setArticle} />}

        {!user ? (
          ""
        ) : writing ? (
          <ArticleEntry addArticle={addArticle} />
        ) : (
          <Article article={article} remove={removeArticle} />
        )}
        {!user && (
          <div className="SignIn">
            {" "}
            <SignIn />
          </div>
        )}
      </div>
    </>
  );
}
