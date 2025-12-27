import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signUp } from '../services/authService';
import { useAuth } from '../context/AuthContent';
import { UserPlus, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Sparkles, Check, X } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { token, user } = await signUp({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      login(user, token);
      navigate('/home');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';
  const passwordLengthValid = formData.password.length >= 6;
  const hasNumber = /[0-9]/.test(formData.password);
  const passwordStrength = [passwordLengthValid, hasNumber].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute top-10 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], y: [0, -50, 0] }} transition={{ duration: 9, repeat: Infinity }}/>
        <motion.div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], x: [0, 30, 0] }} transition={{ duration: 7, repeat: Infinity }}/>
      </div>

      <Link to="/">
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ x: -5 }}
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors z-10">
          <ArrowLeft className="w-5 h-5"/>
          <span className="hidden sm:inline font-medium">Back to Home</span>
        </motion.button>
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
          <div className="text-center mb-8">
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl shadow-lg mb-4">
              <Sparkles className="text-white w-9 h-9"/>
            </motion.div>
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-2">Join Anime Blog</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-purple-200">Create your account to start sharing</motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label className="block text-sm font-semibold text-white mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <User className="w-5 h-5 text-purple-300"/>
                </div>
                <input type="text" name="username" value={formData.username} onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder:text-purple-200/70 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none"
                  placeholder="Choose a username" required/>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <label className="block text-sm font-semibold text-white mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Mail className="w-5 h-5 text-purple-300"/>
                </div>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder:text-purple-200/70 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none"
                  placeholder="Enter your email" required/>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
              <label className="block text-sm font-semibold text-white mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Lock className="w-5 h-5 text-purple-300"/>
                </div>
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3.5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder:text-purple-200/70 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none"
                  placeholder="Create a password" required/>
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-purple-300 hover:text-white transition-colors focus:outline-none">
                  {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                </button>
              </div>
              {formData.password && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 space-y-2">
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={"h-1 flex-1 rounded-full transition-all " + (i < passwordStrength ? (passwordStrength === 1 ? 'bg-red-500' : 'bg-green-500') : 'bg-white/20')}/>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      {passwordLengthValid ? <Check className="w-3.5 h-3.5 text-green-400"/> : <X className="w-3.5 h-3.5 text-red-400"/>}
                      <span className="text-purple-200">6+ characters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {hasNumber ? <Check className="w-3.5 h-3.5 text-green-400"/> : <X className="w-3.5 h-3.5 text-red-400"/>}
                      <span className="text-purple-200">Number</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <label className="block text-sm font-semibold text-white mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Lock className="w-5 h-5 text-purple-300"/>
                </div>
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3.5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder:text-purple-200/70 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none"
                  placeholder="Confirm your password" required/>
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-purple-300 hover:text-white transition-colors focus:outline-none">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                </button>
              </div>
              {formData.confirmPassword && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={"mt-2 text-xs flex items-center gap-1 " + (passwordMatch ? 'text-green-400' : 'text-red-400')}>
                  {passwordMatch ? <><Check className="w-3.5 h-3.5"/> Passwords match</> : <><X className="w-3.5 h-3.5"/> Passwords do not match</>}
                </motion.p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-xs text-purple-200">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </motion.div>

            {message && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-xl backdrop-blur-sm">
                <p className="text-sm font-medium">{message}</p>
              </motion.div>
            )}

            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                {loading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"/>
                    Creating Account...
                  </>
                ) : (<><UserPlus className="w-5 h-5"/>Create Account</>)}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
          </form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-center mt-6">
            <p className="text-purple-200">Already have an account? <Link to="/signin" className="text-white font-bold hover:text-purple-300 transition-colors">Sign In</Link></p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-6 text-center">
          <p className="text-purple-200 text-xs">🔒 Your data is protected with industry-standard security</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
