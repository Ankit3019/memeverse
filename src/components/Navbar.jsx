import { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { motion } from "motion/react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-4xl font-bold text-blue-600 dark:text-blue-400">MemeLand</Link>
        <ul className="md:flex md:space-x-4 hidden">
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/explore" className="text-black text-xl font-semibold dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Explore</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/upload" className="text-black text-xl font-semibold dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Upload</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/leaderboard" className="text-black text-xl font-semibold dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Leaderboard</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/profile" className="text-black text-xl font-semibold dark:text-white hover:text-blue-600 dark:hover:text-blue-400">Profile</Link>
          </motion.li>
        </ul>
        <div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex justify-between space-x-2">
          <DarkModeToggle />
          <div className="md:hidden text-4xl hover:text-blue-600 dark:hover:text-blue-400">
            <button onClick={toggleMenu}>&#8801;</button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="absolute top-0 right-0 w-40 bg-white dark:bg-gray-800 h-full shadow-lg p-4">
            <button onClick={toggleMenu} className="text-4xl text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400">&times;</button>
            <ul className="mt-8 space-y-4">
              <li>
                <Link to="/explore" className="text-black dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400" onClick={toggleMenu}>Explore</Link>
              </li>
              <li>
                <Link to="/upload" className="text-black dark:text-white hover:text-blue-600 font-semibold dark:hover:text-blue-400" onClick={toggleMenu}>Upload</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-black dark:text-white hover:text-blue-600 font-semibold dark:hover:text-blue-400" onClick={toggleMenu}>Leaderboard</Link>
              </li>
              <li>
                <Link to="/profile" className="text-black dark:text-white hover:text-blue-600 font-semibold dark:hover:text-blue-400" onClick={toggleMenu}>Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;