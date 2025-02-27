import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemeCard from "../components/MemeCard";
import { fetchMemes, selectAllMemes } from "../store/slices/memeSlice";
import BigMemeCard from "../components/BigMemeCard";

const Profile = () => {
  const dispatch = useDispatch();
  const memes = useSelector(selectAllMemes);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {
      id: "currentUserId",
      name: "Gangwar",
      bio: "Khuch Bhi",
      profilePicture: "../public/Ankit.png",
      uploadedMemes: [],
      likedMemes: [],
    };
  });

  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);

  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);

  useEffect(() => {
    const savedUploadedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    const savedLikedMemes = memes.filter(meme => localStorage.getItem(`liked-${meme.id}`) === "true" && meme.uploadedBy !== "currentUserId");
    setUploadedMemes(savedUploadedMemes);
    setLikedMemes(savedLikedMemes);
  }, [memes]);

  useEffect(() => {
    const updatedUser = {
      ...user,
      uploadedMemes: uploadedMemes.map(meme => meme.id),
      likedMemes: likedMemes.map(meme => meme.id),
    };
    setUser(updatedUser);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter(u => u.id !== updatedUser.id).concat(updatedUser);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }, [uploadedMemes, likedMemes]);

  const handleEditProfile = () => {
    const newName = prompt("Enter your new name:", user.name);
    const newBio = prompt("Enter your new bio:", user.bio);
    const newProfilePicture = prompt("Enter your new profile picture URL:", user.profilePicture);
    if (newName && newBio && newProfilePicture) {
      const updatedUser = { ...user, name: newName, bio: newBio, profilePicture: newProfilePicture };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.filter(u => u.id !== updatedUser.id).concat(updatedUser);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-xl shadow-2xl"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500"># {user.bio}</p>
          <button
            onClick={handleEditProfile}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer shadow-md"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Uploaded Memes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uploadedMemes.map((meme) => (
          <BigMemeCard key={`uploaded-${meme.id}`} meme={meme} />
        ))}
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Liked Memes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {likedMemes.map((meme) => (
          <MemeCard key={`liked-${meme.id}`} meme={meme} />
        ))}
      </div>
    </div>
  );
};

export default Profile;