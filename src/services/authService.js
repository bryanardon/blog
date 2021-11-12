import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export function SignIn() {
  return (
    <>
      <h1>
        Welcome <br /> to my <br />
        blog!
      </h1>

      <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
        Sign In
      </button>
    </>
  );
}
export function SignOut() {
  const user = useAuthentication();
  return (
    <div>
      Hello, {user && auth.currentUser.displayName} &nbsp;
      <img alt="logo" src={auth.currentUser.photoURL} /> &nbsp;
      <button id="out" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
}

export function useAuthentication() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });
  }, []);
  return user;
}
