import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContent';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import api from '../services/api';
import Navbar from './Navbar';
import { User, Calendar, Mail, Edit, BookOpen, X, Check } from 'lucide-react';

const UserProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const { isDark } = useTheme();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  const isOwnProfile = currentUser && currentUser.id === parseInt(id);

  useEffect(() => {
    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const [profileRes, postsRes] = await Promise.all([
        api.get(`/api/users/${id}`),
        api.get(`/api/users/${id}/posts`)
      ]);

      setProfile(profileRes.data.user);
      setPosts(postsRes.data.posts);
      setFormData({
        username: profileRes.data.user.username,
        email: profileRes.data.user.email
      });
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setEditing(!editing);
    if (editing) {
      setFormData({
        username: profile.username,
        email: profile.email
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/api/users/${id}`, formData);
      setProfile(response.data.user);
      setEditing(false);
      setError('');

      // Update localStorage if editing own profile
      if (isOwnProfile) {
        const updatedUser = { ...currentUser, ...response.data.user };
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Anime Background */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: 'url(https://gifdb.com/images/high/aesthetic-anime-blue-sea-waves-mifyhkjxufwyss6a.gif)',
            filter: isDark ? 'brightness(0.3) contrast(1.3) saturate(1.2)' : 'brightness(0.85) contrast(1.15) saturate(1.1)',
          }}
        />
        <div className={`fixed inset-0 ${isDark ? 'bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-800/80' : 'bg-gradient-to-br from-white/70 via-white/60 to-white/50'} backdrop-blur-[0.5px] -z-10`} />

        <Navbar />
        <div className="flex justify-center items-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: 'url(https://gifdb.com/images/high/aesthetic-anime-blue-sea-waves-mifyhkjxufwyss6a.gif)',
            filter: isDark ? 'brightness(0.3) contrast(1.3) saturate(1.2)' : 'brightness(0.85) contrast(1.15) saturate(1.1)',
          }}
        />
        <div className={`fixed inset-0 ${isDark ? 'bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-800/80' : 'bg-gradient-to-br from-white/70 via-white/60 to-white/50'} backdrop-blur-[0.5px] -z-10`} />

        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/20 border-2 border-red-500/50 text-red-100 dark:text-red-200 px-6 py-4 rounded-2xl backdrop-blur-sm"
          >
            <p className="font-semibold">{error}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Anime Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: 'url(https://gifdb.com/images/high/violet-sky-anime-scenery-92d58tnofkbii156.gif)',
          filter: isDark ? 'brightness(0.4) contrast(1.2)' : 'brightness(0.9) contrast(1.1)',
        }}
      />
      <div className={`fixed inset-0 ${isDark ? 'bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-800/80' : 'bg-gradient-to-br from-white/70 via-white/60 to-white/50'} backdrop-blur-[0.5px] -z-10 transition-colors duration-300`} />

      {/* Floating sakura petals */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-3 h-3 rounded-full bg-pink-300/40 blur-sm -z-10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0
          }}
          animate={{
            y: window.innerHeight + 20,
            x: Math.random() * window.innerWidth,
            rotate: 360
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}

      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl shadow-xl dark:shadow-purple-900/20 border border-gray-200/50 dark:border-gray-700/50 p-8 mb-6 overflow-hidden group"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl shadow-lg">
                    <User size={56} className="text-white" />
                  </div>
                </motion.div>

                <div>
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {profile.username}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar size={18} className="text-purple-500 dark:text-purple-400" />
                    <span className="text-sm font-medium">Joined {formatDate(profile.created_at)}</span>
                  </div>
                </div>
              </div>

              {isOwnProfile && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  {editing ? <X size={20} /> : <Edit size={20} />}
                  {editing ? 'Cancel' : 'Edit Profile'}
                </motion.button>
              )}
            </div>

            {editing ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-purple-400 transition-all outline-none text-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-purple-400 transition-all outline-none text-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-500/20 border-2 border-red-500/50 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl backdrop-blur-sm"
                  >
                    <p className="font-medium">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  <Check size={20} />
                  Save Changes
                </motion.button>
              </motion.form>
            ) : (
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/30 px-4 py-3 rounded-xl">
                <Mail size={20} className="text-purple-500 dark:text-purple-400" />
                <span className="font-medium">{profile.email}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* User Posts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl shadow-xl dark:shadow-purple-900/20 border border-gray-200/50 dark:border-gray-700/50 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <BookOpen size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Posts <span className="text-purple-600 dark:text-purple-400">({posts.length})</span>
            </h2>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block p-6 bg-gray-100 dark:bg-gray-900/50 rounded-2xl mb-4"
              >
                <BookOpen size={64} className="text-gray-400 dark:text-gray-600" />
              </motion.div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {isOwnProfile ? "You haven't created any posts yet" : "This user hasn't created any posts yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link
                    to={`/posts/${post.id}`}
                    className="block relative bg-white dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg dark:hover:shadow-purple-900/30 transition-all"
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 mb-2 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                        {post.content.substring(0, 150)}
                        {post.content.length > 150 && '...'}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                          <Calendar size={14} className="text-purple-500 dark:text-purple-400" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                        {post.tags && (
                          <div className="flex gap-1.5 flex-wrap">
                            {post.tags.split(',').slice(0, 2).map((tag, i) => (
                              <span
                                key={i}
                                className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                              >
                                #{tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
