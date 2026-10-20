// Posts.jsx
import { usePosts } from "../services/postsApi";
import styles from "./Posts.module.css";


export default function Posts() {
  const { isLoading, data, error } = usePosts(10);

  if (isLoading) {
    return <p role="status">Loading posts…</p>;
  }

  if (error) {
    return <p role="alert">Couldn't load posts: {error}</p>;
  }

  return (
    <section className={styles.posts}>
      <h1>Posts</h1>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
          >
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
