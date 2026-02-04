import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { postsAPI } from '../services/api';
import { Heart, MessageCircle, User, Calendar, Tag, Search, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

const PostList = () => {
  const { isDark } = useTheme();
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group"
              >
                <Link to={`/posts/${post.id}`}>
                  <div className={cn(
                    "relative bg-white dark:bg-gray-800 p-7 h-full cursor-pointer rounded-3xl",
                    "border border-gray-200 dark:border-gray-700",
                    "shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.25)]",
                    "dark:shadow-[0_8px_30px_rgba(147,51,234,0.15)] dark:hover:shadow-[0_20px_60px_rgba(147,51,234,0.3)]",
                    "transition-all duration-500",
                    "overflow-hidden",
                    "backdrop-blur-sm"
                  )}>
                    {/* Gradient accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Subtle gradient overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-400/10 dark:via-pink-400/10 dark:to-blue-400/10 rounded-3xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Author Badge */}
                      <div className="flex items-center gap-3 mb-5">
                        <motion.div
                          className="flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              {post.author?.charAt(0).toUpperCase() || '?'}
                            </div>
                          </div>
                        </motion.div>
                        <div>
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-purple-500 dark:text-purple-400" />
                            <span className="font-semibold text-gray-800 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                              {post.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            <Calendar size={12} />
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <motion.h2
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                      >
                        {post.title}
                      </motion.h2>

                      {/* Content Preview */}
                      <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3 leading-relaxed text-sm">
                        {post.content.substring(0, 150)}
                        {post.content.length > 150 && '...'}
                      </p>

                      {/* Tags */}
                      {post.tags && (
                        <div className="flex items-center gap-2 mb-5 flex-wrap">
                          {post.tags.split(',').slice(0, 3).map((tag, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all border border-purple-200/50 dark:border-purple-700/50"
                            >
                              #{tag.trim()}
                            </motion.span>
                          ))}
                        </div>
                      )}

                      {/* Footer - Engagement */}
                      <div className="flex items-center gap-6 pt-5 border-t border-gray-200 dark:border-gray-700">
                        <motion.div
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Heart size={18} />
                          <span className="text-sm font-medium">Like</span>
                        </motion.div>
                        <motion.div
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageCircle size={18} />
                          <span className="text-sm font-medium">Comment</span>
                        </motion.div>
                        <motion.div
                          className="ml-auto flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:gap-2 transition-all"
                        >
                          Read more
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </motion.div>
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
