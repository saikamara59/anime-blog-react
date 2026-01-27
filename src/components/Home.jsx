import Navbar from './Navbar';
import PostList from './PostList';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Anime Ocean/Adventure Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: 'url(https://gifdb.com/images/high/aesthetic-anime-blue-sea-waves-mifyhkjxufwyss6a.gif)',
          filter: isDark ? 'brightness(0.3) contrast(1.3) saturate(1.2)' : 'brightness(0.85) contrast(1.15) saturate(1.1)',
        }}
      />

      {/* Soft overlay for better content readability */}
      <div className={`fixed inset-0 ${isDark ? 'bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-800/80' : 'bg-gradient-to-br from-white/70 via-white/60 to-white/50'} backdrop-blur-[0.5px] -z-10 transition-colors duration-300`} />

      {/* Manga screentone dot pattern overlay */}
      <div
        className="fixed inset-0 opacity-[0.04] -z-10"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '12px 12px'
        }}
      />

      {/* Traditional Japanese pattern - Asanoha (hemp leaf) */}
      <div
        className="fixed inset-0 opacity-[0.02] -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='1'%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30 M15 15 L45 45 M15 45 L45 15'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating sakura petals */}
      {[...Array(15)].map((_, i) => (
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

      {/* Anime-style accent circles with manga halftone effect */}
      <motion.div
        className="fixed top-20 right-10 w-64 h-64 rounded-full blur-3xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="fixed bottom-20 left-10 w-80 h-80 rounded-full blur-3xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.7, 0.4, 0.7]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Manga-style corner decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 -z-10 opacity-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-transparent" />
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 to-transparent" />
      </div>
      <div className="fixed top-0 right-0 w-32 h-32 -z-10 opacity-10">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-purple-500 to-transparent" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-500 to-transparent" />
      </div>

      {/* Japanese-style top border accent */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 -z-10 opacity-60" />
      <div className="fixed top-1 left-0 right-0 h-px bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 -z-10 opacity-30" />

      {/* Content */}
      <Navbar />
      <PostList />
    </div>
  );
};

export default Home;
