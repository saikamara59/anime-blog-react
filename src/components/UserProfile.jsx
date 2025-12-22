import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContent';
import api from '../services/api';
import Navbar from './Navbar';
import { User, Calendar, Mail, Edit, BookOpen } from 'lucide-react';

const UserProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error && !profile) {
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
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <User size={48} className="text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{profile.username}</h1>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Calendar size={16} />
                  <span className="text-sm">Joined {formatDate(profile.created_at)}</span>
                </div>
              </div>
            </div>

            {isOwnProfile && (
              <button
                onClick={handleEditToggle}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <Edit size={18} />
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail size={18} className="text-gray-500" />
                <span>{profile.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* User Posts */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={24} className="text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Posts ({posts.length})
            </h2>
          </div>

          {posts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {isOwnProfile ? "You haven't created any posts yet" : "This user hasn't created any posts yet"}
            </p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:border-purple-400 hover:shadow-md transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-purple-600 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    {post.content.substring(0, 150)}
                    {post.content.length > 150 && '...'}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    {post.tags && (
                      <div className="flex gap-2">
                        {post.tags.split(',').slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
