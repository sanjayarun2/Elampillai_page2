// src/pages/BlogPage.tsx
import React, { useState, useEffect } from 'react';
import { fetchBlogs } from '../services/blogService';
import BlogCard from '../components/BlogCard';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      const blogs = await fetchBlogs();
      setPosts(blogs);
      setLoading(false);
    };

    loadBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}