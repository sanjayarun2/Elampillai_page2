import React, { useState, useEffect } from 'react';
import { storage } from '../../utils/storage';
import type { BlogPost } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export function BlogEditor() {
  const [posts, setPosts] = useState<BlogPost[]>(() => 
    storage.get('blogPosts', [])
  );

  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    author: 'Admin',
    image: ''
  });

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      alert('Please fill in title and content');
      return;
    }

    const postToAdd: BlogPost = {
      id: uuidv4(),
      title: newPost.title || '',
      content: newPost.content || '',
      author: newPost.author || 'Admin',
      image: newPost.image || '',
      date: new Date().toLocaleDateString()
    };

    const updatedPosts = [...posts, postToAdd];
    
    // Ensure storage and state update
    storage.set('blogPosts', updatedPosts);
    setPosts(updatedPosts);

    console.log('New post created:', postToAdd); // Debug log

    // Reset form
    setNewPost({
      title: '',
      content: '',
      author: 'Admin',
      image: ''
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Blog Editor</h2>

      {/* New Post Form */}
      <div className="mb-6">
        <input 
          type="text"
          placeholder="Title"
          value={newPost.title || ''}
          onChange={(e) => setNewPost({...newPost, title: e.target.value})}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea 
          placeholder="Content"
          value={newPost.content || ''}
          onChange={(e) => setNewPost({...newPost, content: e.target.value})}
          className="w-full p-2 border rounded mb-2"
          rows={4}
        />
        <input 
          type="text"
          placeholder="Image URL (optional)"
          value={newPost.image || ''}
          onChange={(e) => setNewPost({...newPost, image: e.target.value})}
          className="w-full p-2 border rounded mb-2"
        />
        <button 
          onClick={handleCreatePost}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Post
        </button>
      </div>

      {/* Existing Posts List */}
      <div>
        {posts.map(post => (
          <div key={post.id} className="border p-4 mb-4 rounded">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}