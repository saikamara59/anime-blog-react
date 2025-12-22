import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContent';
import Navbar from './Navbar';
import api from '../services/api';
import { Heart, MessageCircle, User, Calendar, Tag, Trash2, Send } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPostData = async () => {
    setLoading(true);
    try {
      const [postRes, commentsRes, likesRes] = await Promise.all([
        postsAPI.getOne(id),
        api.get(`/api/posts/${id}/comments`),
        api.get(`/api/posts/${id}/likes`)
      ]);

      setPost(postRes.data.post);
      setComments(commentsRes.data.comments);
      setLikeCount(likesRes.data.like_count);
    } catch (err) {
      setError('Failed to load post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    try {
      if (hasLiked) {
        await postsAPI.like(id, { method: 'DELETE' });
        setLikeCount(likeCount - 1);
        setHasLiked(false);
      } else {
        await postsAPI.like(id);
        setLikeCount(likeCount + 1);
        setHasLiked(true);
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await postsAPI.delete(id);
      navigate('/home');
    } catch (error) {
      console.error('Delete post error:', error);
      setError('Failed to delete post');
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    if (!commentContent.trim()) {
      return;
    }

    setSubmittingComment(true);
    try {
      const response = await api.post(`/api/posts/${id}/comments`, {
        content: commentContent
      });
      setComments([...comments, response.data.comment]);
      setCommentContent('');
    } catch (error) {
      console.error('Comment submit error:', error);
      setError('Failed to submit comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      await api.delete(`/api/comments/${commentId}`);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Delete comment error:', error);
      setError('Failed to delete comment');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <User size={16} />
                <Link to={`/profile/${post.user_id}`} className="hover:text-purple-600">
                  {post.author}
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>

            {post.media_url && (
              <img
                src={post.media_url}
                alt={post.title}
                className="w-full max-h-96 object-cover rounded-lg mb-6"
              />
            )}

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </div>

            {post.tags && (
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <Tag size={16} className="text-gray-500" />
                {post.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-6 border-t pt-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  hasLiked
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart size={20} fill={hasLiked ? 'currentColor' : 'none'} />
                <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
              </button>

              <div className="flex items-center gap-2 text-gray-600">
                <MessageCircle size={20} />
                <span>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
              </div>

              {user && user.id === post.user_id && (
                <button
                  onClick={handleDeletePost}
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={18} />
                  <span>Delete Post</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

          {/* Add Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
              <button
                type="submit"
                disabled={submittingComment || !commentContent.trim()}
                className="mt-2 flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
              >
                <Send size={18} />
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 rounded-md text-center">
              <p className="text-gray-600">
                <Link to="/signin" className="text-purple-600 hover:text-purple-800">
                  Sign in
                </Link>{' '}
                to leave a comment
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="border-b pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-800">{comment.author}</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                    {user && user.id === comment.user_id && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
