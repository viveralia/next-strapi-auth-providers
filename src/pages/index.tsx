import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { Post } from "../types/post";
import { AuthContext } from "../context/AuthContext";
import useSWR from "swr";

async function fetcher(...args) {
  const [endpoint, token] = args;

  const url = "http://localhost:1337" + endpoint;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return response.json();
}

export default function Home () {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const { data, error } = useSWR<Post[]>(auth ? ["/posts", auth.jwt] : null, fetcher);

  useEffect(() => {
    if (auth === null) router.push("/auth");
  }, [auth]);

  if (error) return <p>Ocurrió un error</p>
  if (!data) return <p>Loading...</p>

  return (
    <div>
      <h1>Articles</h1>
      {data && !data.length && <p>No hay artículos</p>}
      {data.map(article => (
        <article key={article.id}>
          <Link href={`/${article.slug}`}>
            <a>
              <h2>{article.name}</h2>
            </a>
          </Link>
        </article>
      ))}
    </div>
  )
}