import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (auth === null) {
      router.push("/auth");
    }
  }, [auth]);

  if (!auth) {
    return <p>Loading...</p>
  }

  function handleLogOut() {
    localStorage.removeItem("auth");
    setAuth(null);
    router.push("/auth");
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome {auth?.user.email}, you logged in using {auth?.user.provider}</p>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}