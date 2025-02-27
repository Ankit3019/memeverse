import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explorer from "./pages/Explorer";
import Upload from "./pages/Upload";
import MemeDetails from "./pages/MemeDetails";
import Navbar from "./components/NavBar";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Leaderboard from "./pages/Leaderboard";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explorer />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/meme/:id" element={<MemeDetails />} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Leaderboard" element={<Leaderboard/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;