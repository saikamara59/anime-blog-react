import Navbar from './Navbar';
import PostList from './PostList';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import {
  Sparkles, TrendingUp, BookOpen, Users,
  Zap, Star, ArrowRight, Flame, Eye, MessageCircle
} from 'lucide-react';
import onePieceGif from '../assets/One Piece Gear 5 GIF.gif';

const Home = () => {
  const { isDark } = useTheme();
  const { scrollY } = useScroll();

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const categoriesY = useTransform(scrollY, [0, 500], [0, -50]);

  const categories = [
    {
      icon: Flame,
      title: "Trending",
      description: "Hot topics right now",
      gradient: "from-orange-500 to-red-600",
      count: "1.2k"
    },
    {
      icon: Star,
      title: "Reviews",
      description: "Top-rated anime",
      gradient: "from-yellow-500 to-orange-500",
      count: "850"
    },
    {
      icon: MessageCircle,
      title: "Discussions",
      description: "Join the conversation",
      gradient: "from-blue-500 to-purple-600",
      count: "2.5k"
    },
    {
      icon: BookOpen,
      title: "News",
      description: "Latest updates",
      gradient: "from-green-500 to-teal-600",
      count: "420"
    },
  ];

  const stats = [
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "Total Posts", value: "50K+", icon: BookOpen },
    { label: "Daily Views", value: "100K+", icon: Eye },
    { label: "Communities", value: "250+", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Clean gradient background */}
      <div className={`fixed inset-0 ${isDark ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' : 'bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50'} -z-10 transition-colors duration-300`} />

      {/* Subtle animated accent orbs */}
      <motion.div
        className="fixed top-40 right-20 w-96 h-96 rounded-full blur-3xl -z-10"
        style={{
          background: isDark ? 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="fixed bottom-40 left-20 w-96 h-96 rounded-full blur-3xl -z-10"
        style={{
          background: isDark ? 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.4, 0.6]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative pt-20 pb-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full text-purple-600 dark:text-purple-300 font-semibold text-sm border border-purple-500/30">
                  <Sparkles className="inline mr-2" size={16} />
                  Welcome to AnimeSphere
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-6 anime-title"
              >
                <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Your Ultimate
                </span>
                <br />
                <span className="anime-gradient-text">
                  Anime Community
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}
              >
                Discover, discuss, and share your passion for anime with fans worldwide.
                Join the conversation, write reviews, and explore endless content.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/create-post">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="modern-button flex items-center gap-2 text-lg shadow-2xl"
                  >
                    Start Writing
                    <ArrowRight size={20} />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                    isDark
                      ? 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/30'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-300'
                  }`}
                >
                  Explore Posts
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`text-center p-4 rounded-xl ${
                      isDark ? 'bg-white/5 backdrop-blur-sm' : 'bg-white/60 backdrop-blur-sm'
                    }`}
                  >
                    <stat.icon className="mx-auto mb-2 text-purple-600 dark:text-purple-400" size={24} />
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image - One Piece GIF */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-3xl opacity-40 animate-pulse" />

                {/* Image container */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src={onePieceGif}
                    alt="One Piece Gear 5"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2"
                >
                  <TrendingUp size={20} />
                  Trending Now
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        style={{ y: categoriesY }}
        className="relative py-16 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 anime-title ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Explore Categories
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Find content that matches your interests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group cursor-pointer"
              >
                <div className={`relative h-full p-6 rounded-2xl ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                    : 'bg-white/80 hover:bg-white border border-gray-200'
                } backdrop-blur-lg transition-all shadow-xl hover:shadow-2xl overflow-hidden`}>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />

                  <div className="relative">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                      <category.icon className="text-white" size={28} />
                    </div>

                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {category.title}
                    </h3>

                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {category.count} posts
                      </span>
                      <motion.div
                        className={`${isDark ? 'text-purple-400' : 'text-purple-600'}`}
                        whileHover={{ x: 5 }}
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-12 px-4 my-16"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative p-12 rounded-3xl overflow-hidden ${
              isDark ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50' : 'bg-gradient-to-r from-purple-100 to-pink-100'
            } backdrop-blur-lg border-2 ${isDark ? 'border-white/10' : 'border-purple-200'} shadow-2xl`}
          >
            <div className="relative z-10 text-center">
              <Zap className={`mx-auto mb-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} size={48} />
              <h3 className={`text-3xl md:text-4xl font-bold mb-4 anime-title ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Join Our Growing Community
              </h3>
              <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Share your thoughts, connect with fellow otaku, and never miss an update
              </p>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="modern-button text-lg shadow-2xl"
                >
                  Get Started Free
                </motion.button>
              </Link>
            </div>

            {/* Animated background elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Posts Section */}
      <section className="relative">
        <PostList />
      </section>
    </div>
  );
};

export default Home;
