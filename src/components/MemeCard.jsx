import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const MemeCard = ({ meme }) => {
    const [liked, setLiked] = useState(localStorage.getItem(`liked-${meme.id}`) === "true");

    const toggleLike = () => {
        const newLikedState = !liked;
        localStorage.setItem(`liked-${meme.id}`, newLikedState.toString());
        setLiked(newLikedState);
    };
    
    return (
      <motion.div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        <Link to={`/meme/${meme.id}`}>
            <img src={meme.url} alt={meme.name} className="w-full h-48 object-cover" />
        </Link>
        <div className="p-4">
          <h3 className="text-gray-400 text-lg font-semibold mb-2">{meme.name}</h3>
        </div>
        <button 
            onClick={toggleLike} 
            className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer shadow-md">
            <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
        </button>
      </motion.div>
    );
  };
  
  export default MemeCard;