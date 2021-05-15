import { useRouter } from "next/router"
import { useContext, useEffect } from "react";

import { Auth, AuthContext } from "../../context/AuthContext";

export default function OAuthPage () {
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
  if (!router.query.provider) return;

  const { provider } = router.query;
  const pathNameDividedBySlashes = router.pathname.split("/");
  const routeNameChars = 1 + pathNameDividedBySlashes[1].length; // /oauth
  const providerChars = 1 + provider.length; // /google
  const path = router.asPath.substring(routeNameChars + providerChars);
  const url = `http://localhost:1337/auth/${provider}/callback/${path}`;

  fetch(url)
  .then<Auth>(response => response.json())
  .then(authResponse => {
    localStorage.setItem("auth", JSON.stringify(authResponse));
    setAuth(authResponse);
    router.push("/");
  });

  }, [router]);

  return (
    <p>Loading...</p>
  )
}