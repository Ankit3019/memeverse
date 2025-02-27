import axios from "axios";

export const fetchTrendingMemes = async () => {
  const response = await axios.get("https://api.imgflip.com/get_memes");
  return response.data.data.memes;
};