import { useRouter } from "next/router"
import { useContext, useEffect } from "react";
import Markdown from "react-markdown";
import useSWR from "swr";

import { Post } from "../types/post";
import { AuthContext } from "../context/AuthContext";

async function fetcher (...args) {
  const [endpoint, postSlug, token] = args;
  const url =`http://localhost:1337${endpoint}?slug=${postSlug}`;
  const options = { headers: { "Authorization": `Bearer ${token}` } };
  const response = await fetch(url, options);
  const posts = await response.json();
  return posts[0];
}

export default function PostDetail() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const { data, error } = useSWR<Post>(auth 
    ? ["/posts", router.query.postSlug, auth.jwt] 
    : null, fetcher);

  useEffect(() => {
    if (auth === null) router.push("/auth");
  }, [auth]);

  if (error) return <p>Ocurrió un error</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <main>
      <h1>{data.name}</h1>
      <Markdown>{data.content}</Markdown>
    </main>
  )
}