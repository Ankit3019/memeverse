import { useEffect, useState } from "react";
import { fetchTrendingMemes } from "../utils/api";
import MemeCard from "../components/MemeCard";

const Home = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const loadMemes = async () => {
      const data = await fetchTrendingMemes();
      setMemes(data);
    };
    loadMemes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Trending Memes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
};

export default Home;