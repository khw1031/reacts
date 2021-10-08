import { CommentsType } from '@typings/comment';
import { PostType } from '@typings/Post';
import { useQuery, useMutation } from 'react-query';

async function fetchComments(postId: number): Promise<CommentsType> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

async function deletePost(postId: number): Promise<CommentsType> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, { method: 'DELETE' });
  return response.json();
}

async function updatePost(postId: number): Promise<CommentsType> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify({ title: 'REACT QUERY FOREVER!!!!' }),
  });
  return response.json();
}

type Props = {
  post: PostType;
};

export function PostDetail({ post }: Props) {
  // replace with useQuery
  const { data, isLoading } = useQuery(['comments', post.id], () => fetchComments(post.id));
  const deleteMutation = useMutation((postId: number) => deletePost(postId));
  const updateMutation = useMutation((postId: number) => updatePost(postId));

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>{' '}
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {deleteMutation.isError && <p style={{ color: 'red' }}>Error deleting post</p>}
      {deleteMutation.isLoading && <p style={{ color: 'purple' }}>Deleting the post</p>}
      {deleteMutation.isSuccess && <p style={{ color: 'green' }}>Page has (not) been deleted</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data!.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
