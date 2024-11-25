import React from 'react';
import BlogCard from '../components/BlogCard';
import { storage } from '../utils/storage';
import type { BlogPost } from '../types';

export default function Blog() {
  const posts = storage.get<BlogPost[]>('blogPosts', []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">News & Updates</h1>
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No posts available yet.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}