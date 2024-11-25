import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard'; // Adjust import path
import { storage } from '../utils/storage';
import type { BlogPost as BlogPostType } from '../types';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    // Load posts from storage when component mounts
    const savedPosts = storage.get('blogPosts', []);
    console.log('Loaded posts:', savedPosts); // Debug log
    setPosts(savedPosts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      
      {posts.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}