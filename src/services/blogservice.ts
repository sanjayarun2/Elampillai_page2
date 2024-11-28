// src/services/blogService.ts
import axios from 'axios';
import { persistentStorage } from '../utils/storage';

export const fetchBlogs = async () => {
  try {
    // Fetch fresh data
    const response = await axios.get('/api/blogs', {
      headers: {
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache'
      }
    });
    
    // Store persistently
    persistentStorage.set('blogPosts', response.data);
    return response.data;
  } catch (error) {
    // Fallback to stored data
    return persistentStorage.get('blogPosts');
  }
};