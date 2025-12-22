import Navbar from './Navbar';
import PostList from './PostList';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      <PostList />
    </div>
  );
};

export default Home;
