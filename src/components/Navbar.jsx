import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContent';
import { Menu, X, User, LogOut, PlusCircle, Home, BookOpen } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 shadow-lg sticky top-0 z-50 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/home" className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <BookOpen className="text-white" size={28} />
              </motion.div>
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                Anime Blog
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/home"
                    className="flex items-center space-x-1 text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-all backdrop-blur-sm"
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/create-post"
                    className="flex items-center space-x-1 text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-all backdrop-blur-sm"
                  >
                    <PlusCircle size={18} />
                    <span>Create Post</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={`/profile/${user?.id}`}
                    className="flex items-center space-x-1 text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-all backdrop-blur-sm"
                  >
                    <div className="bg-white/30 p-1 rounded-full">
                      <User size={16} />
                    </div>
                    <span className="font-medium">{user?.username}</span>
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/signin"
                    className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all backdrop-blur-sm"
                  >
                    Sign In
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/signup"
                    className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold transition-all shadow-lg"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-white/20 p-2 rounded-lg backdrop-blur-sm"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-purple-700/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      to="/home"
                      className="flex items-center space-x-2 text-white hover:bg-white/20 px-3 py-2 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Home size={18} />
                      <span>Home</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Link
                      to="/create-post"
                      className="flex items-center space-x-2 text-white hover:bg-white/20 px-3 py-2 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <PlusCircle size={18} />
                      <span>Create Post</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      to={`/profile/${user?.id}`}
                      className="flex items-center space-x-2 text-white hover:bg-white/20 px-3 py-2 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User size={18} />
                      <span>{user?.username}</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left text-white hover:bg-red-600 px-3 py-2 rounded-lg"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      to="/signin"
                      className="block text-white hover:bg-white/20 px-3 py-2 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Link
                      to="/signup"
                      className="block text-white hover:bg-white/20 px-3 py-2 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
