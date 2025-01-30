import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts?page=${page}&limit=5`)
      .then((response) => {
        setPosts(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error(error));
  }, [page]);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`http://localhost:3000/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          setPosts(posts.filter((post) => post._id !== id));
          alert("Post deleted successfully!");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to delete the post.");
        });
    }
  };

  return (
    <div>
      <h2>Post List</h2>
      <Link to="/posts/create">Create New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
            <Link to={`/posts/edit/${post._id}`}>Edit</Link>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PostList;
