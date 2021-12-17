import { auth } from "../firebaseConfig";
import { useAuthentication } from "../services/authService";
import { me } from "./App.js";
export default function Article({ article, remove }) {
  const user = useAuthentication();
  return (
    <article>
      {!article ? (
        <p>No article selected</p>
      ) : (
        <section>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${article.date.toDate()}`}</p>
          <p className="body">{article.body}</p>
        </section>
      )}
      {user && auth.currentUser.uid == me && article ? (
        <button onClick={() => remove(article.id)}>Delete</button>
      ) : (
        ""
      )}
    </article>
  );
}
