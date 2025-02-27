import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MemeCard from "../components/MemeCard";
import debounce from "lodash/debounce";

function Explorer() {
  const [memes, setMemes] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("trending");
  const [sortBy, setSortBy] = useState("likes");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMemes = useCallback(async () => {
    try {
      const res = await axios.get(`https://api.imgflip.com/get_memes?page=${page}&category=${category}`);
      setMemes((prevMemes) => [...prevMemes, ...res.data.data.memes]);
      setHasMore(res.data.data.memes.length > 0);
    } catch (err) {
      console.error(err);
    }
  }, [page, category]);

  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);

  const handleSearch = useCallback(
    debounce((query) => {
      setQuery(query);
      setPage(1);
      setMemes([]);
      fetchMemes();
    }, 500),
    [fetchMemes]
  );

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const sortedMemes = memes
    .filter((meme) => meme.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "date") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "comments") return b.comments - a.comments;
      return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Explore Memes</h1>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search memes..."
          className="border p-2 mb-4 w-full rounded-lg shadow-md"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="flex justify-between mb-4">
          <select
            className="border p-2 rounded-lg text-xl hover:bg-gray-400 cursor-pointer shadow-md"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
              setMemes([]);
            }}
          >
            <option value="trending">Trending</option>
            <option value="new">New</option>
            <option value="classic">Classic</option>
            <option value="random">Random</option>
          </select>
          <select
            className="border p-2 rounded-lg hover:bg-gray-400 cursor-pointer shadow-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="likes">Likes</option>
            <option value="date">Date</option>
            <option value="comments">Comments</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedMemes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explorer;