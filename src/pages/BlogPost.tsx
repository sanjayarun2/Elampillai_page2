import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, User, MessageCircle, Trash2, Share2 } from 'lucide-react';
import { storage } from '../utils/storage';
import type { BlogPost as BlogPostType } from '../types';
import { Helmet } from 'react-helmet-async';

interface Comment {
  id: string;
  text: string;
  author: string;
  date: string;
}

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const whatsappLink = storage.get('whatsappLink', '');

  useEffect(() => {
    const loadPost = () => {
      const posts = storage.get<BlogPostType[]>('blogPosts', []);
      const foundPost = posts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
        // Update meta tags
        document.title = `${foundPost.title} - Elampillai Community`;
      } else {
        navigate('/blog');
      }
    };

    loadPost();
    // Add event listener for popstate to handle browser back/forward
    window.addEventListener('popstate', loadPost);
    return () => window.removeEventListener('popstate', loadPost);
  }, [id, navigate]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/blog/${id}`;
    const shareText = `Check out this post: ${post?.title}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to WhatsApp share
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && commentAuthor.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        text: newComment,
        author: commentAuthor,
        date: new Date().toLocaleDateString()
      };
      setComments([...comments, comment]);
      setNewComment('');
      setCommentAuthor('');
    }
  };

  const deleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Loading post...</p>
        <Link to="/blog" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} - Elampillai Community`}</title>
        <meta name="description" content={post.content.substring(0, 155)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.substring(0, 155)} />
        <meta property="og:image" content={post.image || ''} />
        <meta property="og:url" content={`${window.location.origin}/blog/${id}`} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            {post.image && (
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
              <button
                onClick={handleShare}
                className="text-blue-600 hover:text-blue-800"
                aria-label="Share post"
              >
                <Share2 className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 whitespace-pre-wrap">{post.content}</p>
            </div>

            {whatsappLink && (
              <div className="mt-8 text-center">
                <h3 className="text-xl font-semibold mb-4">எங்கள் சமூகத்தில் சேரவும் | Join Our Community</h3>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <MessageCircle className="h-6 w-6 mr-2" />
                  Join WhatsApp Community
                </a>
              </div>
            )}
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Comments</h2>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="mb-4">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="author"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={3}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{comment.author}</h3>
                    <p className="text-sm text-gray-600">{comment.date}</p>
                  </div>
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-gray-600">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}