import { useState } from "react";
import axios from "axios";
import { motion } from "motion/react"; 

const Upload = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [aiCaption, setAiCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
      params: { key: import.meta.env.VITE_API_KEY },
    });

    const newMeme = {
      id: Date.now(),
      url: response.data.data.url,
      name: caption,
      likes: 0,
      uploadedBy: "currentUserId", 
    };

    const savedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    savedMemes.push(newMeme);
    localStorage.setItem("uploadedMemes", JSON.stringify(savedMemes));
    setPreview(response.data.data.url);
    console.log("Uploaded Image URL:", response.data.data.url);
    console.log("Meme Details:", response.data.status);
  };

  const generateAiCaption = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.meme-generator.com/generate-caption", {
        params: { image_url: preview },
      });
      setAiCaption(response.data.caption);
      setCaption(response.data.caption);
    } catch (error) {
      console.error("Error generating AI caption:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Upload a Meme</h1>
      <div className="max-w-md mx-auto space-y-3">
        <div>
          <label htmlFor="meme-file" className="block mb-2 font-bold">
            Choose a meme image:
          </label>
          <input
            id="meme-file"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="w-full p-2 border rounded cursor-pointer shadow-md"
          />
        </div>
        {preview && (
          <div className="mb-4">
            <img src={preview} alt="Meme preview" className="max-w-full h-auto shadow-md" />
          </div>
        )}
        <div>
          <label htmlFor="meme-caption" className="block mb-2 font-bold">Add a caption:</label>
          <textarea
            id="meme-caption"
            type="text"
            placeholder="Add a caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border rounded shadow-md"
            rows={3}
          />
        </div>
        <motion.button
          onClick={generateAiCaption}
          className="w-full bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded cursor-pointer mb-4 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!preview || loading}
        >
          {loading ? "Generating AI Caption..." : "Generate AI Caption"}
        </motion.button>
        <motion.button
          onClick={handleUpload}
          className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded cursor-pointer shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!file || !caption}
        >
          Upload
        </motion.button>
      </div>
    </div>
  );
};

export default Upload;