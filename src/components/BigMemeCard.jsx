import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const BigMemeCard = ({ meme }) => {
  const [liked, setLiked] = useState(localStorage.getItem(`liked-${meme.id}`) === "true");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // useEffect(() => {
  //   console.log("Meme data:", meme);
  // }, [meme]);

  const toggleLike = () => {
    localStorage.setItem(`liked-${meme.id}`, !liked);
    setLiked(!liked);
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden relative">
      <motion.img whileHover={{ scale: 1.05 }} src={meme.url} alt={meme.name} className="w-full md:h-96" />
      <div className="p-4">
        <h3 className="text-gray-400 text-lg font-semibold mb-2">{meme.name}</h3>
        {user && <p className="text-gray-500">Uploaded by: {user.name}</p>}
      </div>
      <button 
        onClick={toggleLike} 
        className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer">
        <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
      </button>
    </div>
  );
};

export default BigMemeCard;