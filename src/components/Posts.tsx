import { PostsType, PostType } from '@typings/Post';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { PostDetail } from './PostDetail';
const maxPostPage = 10;

async function fetchPosts(pageNum: number): Promise<PostsType | void> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`);
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  const queryClient = useQueryClient();

  // Prefetch
  useEffect(() => {
    if (currentPage === maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(['posts', nextPage], () => fetchPosts(nextPage));
    }
  }, [currentPage, queryClient]);

  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(['posts', currentPage], () => fetchPosts(currentPage), {
    staleTime: 2000,
    keepPreviousData: true,
  });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError && error instanceof Error)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <ul>
        {data!.map((post) => (
          <li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prevValue) => prevValue - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prevValue) => prevValue + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
