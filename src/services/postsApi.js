// postsApi.js
import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

/**
 * Async API function. Fetches posts and resolves to an object:
 *   { isLoading: boolean, data: Post[] | null, error: string | null }
 * It never throws, so callers don't need their own try/catch.
 */
export async function fetchPosts({ limit = 10, signal } = {}) {
  try {
    const response = await fetch(`${API_URL}?_limit=${limit}`, { signal });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return { isLoading: false, data, error: null };
  } catch (err) {
    return {
      isLoading: false,
      data: null,
      error: err.message || "Something went wrong",
    };
  }
}

/**
 * Runs fetchPosts and returns the same { isLoading, data, error } object,
 * starting with isLoading: true. This keeps all state handling out of the
 * component, which can just destructure the result and render.
 */
export function usePosts(limit = 10) {
  const [result, setResult] = useState({
    isLoading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    setResult({ isLoading: true, data: null, error: null });

    fetchPosts({ limit, signal: controller.signal }).then((next) => {
      // Ignore results from a request that was cancelled (unmount / limit change).
      if (!controller.signal.aborted) setResult(next);
    });

    return () => controller.abort();
  }, [limit]);

  return result;
}
