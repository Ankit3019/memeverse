import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemes, selectAllMemes } from "../store/slices/memeSlice";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const memes = useSelector(selectAllMemes);
  const [topMemes, setTopMemes] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    // console.log("Saved Users:", savedUsers); 
    const sortedMemes = [...memes].sort((a, b) => b.likes - a.likes).slice(0, 9);
    setTopMemes(sortedMemes);

    const sortedUsers = savedUsers
      .map((user) => ({
        ...user,
        engagement: (user.uploadedMemes ? user.uploadedMemes.length : 0) + (user.likedMemes ? user.likedMemes.length : 0),
      }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 9);
    setTopUsers(sortedUsers);
  }, [memes]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
      <h2 className="text-2xl font-bold mb-4">Top 9 Memes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topMemes.map((meme, index) => (
          <motion.div key={meme.id} className="border rounded-xl p-4 bg-white dark:bg-gray-700 shadow-lg overflow-hidden" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <h3 className="text-xl font-semibold">#{index + 1}</h3>
            <Link to={`/meme/${meme.id}`}>
              <img src={meme.url} alt={meme.name} className="w-full h-48 object-cover rounded-xl" />
            </Link>
            <div className="p-4">
              <h3 className="text-gray-400 text-lg font-semibold mb-2">{meme.name}</h3>
              <p className="mt-2 text-xl font-semibold text-black">Likes: {meme.likes}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Top 9 Users</h2>
      <div className="space-y-4">
        {topUsers.map((user, index) => (
          <div key={user.id} className="flex items-center space-x-4 p-2">
            <h3 className="text-xl font-semibold">#{index + 1}</h3>
            <img src={user.profilePicture} alt={user.name} className="w-24 h-24 rounded-xl shadow-2xl"/>
            <div>
              <p className="text-2xl font-semibold">{user.name}</p>
              <p className="text-xl text-gray-500"># {user.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;