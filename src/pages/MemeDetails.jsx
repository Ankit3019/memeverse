import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BigMemeCard from "../components/BigMemeCard";
import { fetchTrendingMemes } from "../utils/api";
import { FaHeart, FaShareAlt } from "react-icons/fa";

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(localStorage.getItem(`liked-${id}`) === "true");

  useEffect(() => {
    const loadMeme = async () => {
      const data = await fetchTrendingMemes();
      const meme = data.find((meme) => meme.id === id);
      setMeme(meme);
    };
    loadMeme();
  }, [id]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
    setComments(savedComments);
  }, [id]);

  const handleLike = () => {
    localStorage.setItem(`liked-${id}`, !liked);
    setLiked(!liked);
  };

  const handleCommentSubmit = () => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  if (!meme) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center p-4">
        <div className="grid grid-cols-1">
          <BigMemeCard key={meme.id} meme={meme} />
          <div className="flex items-center justify-between mt-4">
            <button onClick={handleLike} className="flex items-center space-x-2 cursor-pointer">
              <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
              <span>{liked ? "Unlike" : "Like"}</span>
            </button>
            <button className="flex items-center space-x-2 cursor-pointer">
              <FaShareAlt className="text-gray-400" />
              <span>Share</span>
            </button>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Comments</h2>
            <div className="space-y-2">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded">
                  {comment}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded shadow-md"
                rows={3}
                placeholder="Add a comment"
              />
              <button
                onClick={handleCommentSubmit}
                className="mt-2 bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded cursor-pointer shadow-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeDetails;