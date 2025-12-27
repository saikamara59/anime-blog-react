import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { postsAPI } from '../services/api';
import { Heart, MessageCircle, User, Calendar, Tag, Search, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 10,
        ...(searchQuery && { q: searchQuery }),
        ...(tagFilter && { tag: tagFilter }),
        ...(authorFilter && { author: authorFilter })
      };

      const response = await postsAPI.getAll(params);
      setPosts(response.data.posts);
      setError('');
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery, tagFilter, authorFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPosts();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Modern Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-purple-900/20 border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="text-purple-600 dark:text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Discover Posts</h2>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-400 dark:text-gray-500 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search anime posts, reviews, discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-purple-400 transition-all outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Filter by tag..."
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-purple-400 transition-all outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Filter by author..."
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-purple-400 transition-all outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="modern-button flex-1 sm:flex-none"
              >
                Search
              </motion.button>

              {(searchQuery || tagFilter || authorFilter) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setTagFilter('');
                    setAuthorFilter('');
                    setPage(1);
                  }}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-semibold transition-all"
                >
                  Clear Filters
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-xl mb-6 shadow-sm"
        >
          <p className="font-medium">{error}</p>
        </motion.div>
      )}

      {/* Posts Grid */}
      <AnimatePresence mode="wait">
        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="modern-card text-center py-16 px-6"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-6">Be the first to share your anime passion!</p>
            <Link to="/create-post">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="modern-button"
              >
                Create First Post
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Link to={`/posts/${post.id}`}>
                  <div className={cn(
                    "relative bg-white dark:bg-gray-800 p-6 h-full cursor-pointer rounded-2xl border border-gray-200/50 dark:border-gray-700/50",
                    "shadow-lg hover:shadow-2xl dark:shadow-purple-900/20 dark:hover:shadow-purple-900/40",
                    "hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300",
                    "backdrop-blur-sm"
                  )}>
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <div className="flex-shrink-0 ml-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
                            {post.author?.charAt(0).toUpperCase() || '?'}
                          </div>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1.5">
                          <User size={16} className="text-purple-500 dark:text-purple-400" />
                          <span className="font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            {post.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} className="text-purple-500 dark:text-purple-400" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                      </div>

                      {/* Content Preview */}
                      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                        {post.content.substring(0, 200)}
                        {post.content.length > 200 && '...'}
                      </p>

                      {/* Tags */}
                      {post.tags && (
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          {post.tags.split(',').slice(0, 3).map((tag, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                              className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/50 dark:hover:to-pink-800/50 transition-all"
                            >
                              #{tag.trim()}
                            </motion.span>
                          ))}
                        </div>
                      )}

                      {/* Footer - Engagement */}
                      <div className="flex items-center gap-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                          <Heart size={18} />
                          <span className="text-sm font-medium">Like</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                          <MessageCircle size={18} />
                          <span className="text-sm font-medium">Comment</span>
                        </div>
                        <div className="ml-auto">
                          <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-1 inline-block transition-transform">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Modern Pagination */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center gap-4 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className={cn(
              "px-6 py-3 rounded-xl font-semibold transition-all",
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl"
            )}
          >
            Previous
          </motion.button>

          <div className="px-6 py-3 bg-white rounded-xl font-bold text-gray-800 shadow-md border-2 border-purple-200">
            Page {page}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage(page + 1)}
            disabled={posts.length < 10}
            className={cn(
              "px-6 py-3 rounded-xl font-semibold transition-all",
              posts.length < 10
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl"
            )}
          >
            Next
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default PostList;
