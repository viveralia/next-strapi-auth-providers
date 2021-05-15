import { useEffect, useState } from "react";
import decode from "jwt-decode";

import { Auth, AuthContext } from "../context/AuthContext";
import Link from "next/link";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState<Auth | undefined>(undefined);

  useEffect(() => {
    const auth: Auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth) return setAuth(null);

    const token = decode<{exp: number}>(auth.jwt);
    const isTokenStillValid = new Date() > new Date(token.exp);
    if (!isTokenStillValid) {
      localStorage.removeItem("auth");
      return setAuth(null);
    };

    setAuth(auth);
  }, []);

  function handleLogOut() {
    localStorage.removeItem("auth");
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Link href="/" passHref>
          <a>Home</a>
        </Link>
        <button onClick={handleLogOut}>Log out</button>
      </header>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}
