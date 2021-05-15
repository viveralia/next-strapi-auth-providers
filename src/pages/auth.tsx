import { useRouter } from "next/router"
import { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) return;
    router.push("/profile");
  }, [auth]);

  return (
    <div>
      <h1>Log in to proceed</h1>
      <a href="http://localhost:1337/connect/google">Log in with Google</a>
      <a href="http://localhost:1337/connect/linkedin">Log in with LinkedIn</a>
    </div>
  )
}