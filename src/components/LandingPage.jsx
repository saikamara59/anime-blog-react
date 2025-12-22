import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Users, TrendingUp } from "lucide-react";

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home");
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 overflow-hidden relative">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full opacity-10"
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                {/* Logo/Icon Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 1
                    }}
                    className="mb-8"
                >
                    <div className="relative">
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-2xl opacity-50"
                        />
                        <div className="relative bg-white rounded-full p-6 shadow-2xl">
                            <BookOpen size={64} className="text-purple-600" />
                        </div>
                    </div>
                </motion.div>

                {/* Title Animation */}
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-6xl md:text-8xl font-bold text-white text-center mb-4 tracking-tight"
                >
                    <motion.span
                        animate={{
                            textShadow: [
                                "0 0 20px rgba(255,255,255,0.5)",
                                "0 0 40px rgba(255,255,255,0.8)",
                                "0 0 20px rgba(255,255,255,0.5)",
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Anime Blog
                    </motion.span>
                </motion.h1>

                {/* Subtitle Animation */}
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl md:text-2xl text-pink-200 text-center mb-12 max-w-2xl"
                >
                    Share your passion for anime, connect with fans worldwide, and discover amazing content
                </motion.p>

                {/* Feature Cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full"
                >
                    {[
                        { icon: Sparkles, text: "AI-Powered Tags", color: "from-yellow-400 to-orange-500" },
                        { icon: Users, text: "Community Driven", color: "from-blue-400 to-purple-500" },
                        { icon: TrendingUp, text: "Trending Posts", color: "from-pink-400 to-red-500" },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 shadow-xl"
                        >
                            <div className={`inline-block p-3 rounded-full bg-gradient-to-r ${feature.color} mb-3`}>
                                <feature.icon className="text-white" size={28} />
                            </div>
                            <p className="text-white font-semibold text-lg">{feature.text}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Loading Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-4 h-4 bg-white rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                    <p className="text-white/80 text-sm">Preparing your experience...</p>
                </motion.div>

                {/* Skip Button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/home")}
                    className="mt-8 px-8 py-3 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-colors"
                >
                    Skip Intro
                </motion.button>
            </div>
        </div>
    )
}

export default LandingPage; 
