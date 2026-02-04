import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Sparkles, Users , TrendingUp, Zap, ArrowRight } from "lucide-react";
import ichigoGif from "../assets/ichigo kurosaki bleach GIF.gif";

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home");
        }, 8000);
        return () => clearTimeout(timer);
    }, [navigate]);

    const features = [
        {
          icon: Sparkles,
          title: "AI-Powered Tags",
          description: "Smart content categorization",
          gradient: "from-yellow-400 to-orange-500"
        },
        {
          icon: Users,
          title: "Community Driven",
          description: "Connect with anime fans",
          gradient: "from-blue-400 to-purple-500"
        },
        {
          icon: TrendingUp,
          title: "Trending Posts",
          description: "Discover popular content",
          gradient: "from-pink-400 to-red-500"
        },
        {
          icon: Zap,
          title: "Real-time Updates",
          description: "Stay in the loop",
          gradient: "from-green-400 to-cyan-500"
        },
    ];

    return (
        <div className="min-h-screen overflow-hidden relative">
            {/* Anime Fighting GIF Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Background GIF */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${ichigoGif})`,
                        filter: 'brightness(0.5) contrast(1.2)',
                        backgroundSize: 'cover'
                    }}
                />

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-black/50 to-indigo-900/60 backdrop-blur-[2px]" />

                {/* Animated accent blobs */}
                <motion.div
                    className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        duration: 1
                    }}
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur-2xl opacity-60"
                        />
                        <div className="relative bg-white rounded-full p-8 shadow-2xl">
                            <Sparkles size={64} className="text-purple-600" />
                        </div>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mb-6"
                >
                    <h1 className="anime-title text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
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
                            AnimeSphere
                        </motion.span>
                    </h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full"
                    />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl md:text-2xl text-purple-100 max-w-2xl mb-12"
                >
                    Share your passion for anime, connect with fans worldwide, and discover amazing content
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/home")}
                    className="group relative px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all mb-16"
                >
                    <span className="flex items-center gap-2">
                        Get Started
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </motion.button>

                {/* Feature Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl w-full mb-12"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center"
                        >
                            <div className={`inline-block p-3 rounded-full bg-gradient-to-r ${feature.gradient} mb-3`}>
                                <feature.icon className="text-white" size={24} />
                            </div>
                            <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                            <p className="text-purple-200 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Loading Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 bg-white rounded-full"
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
                    <p className="text-white/60 text-sm">Loading your experience...</p>
                </motion.div>
            </div>
        </div>
    )
}

export default LandingPage;
