import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, selectDarkMode } from "../store/slices/uiSlice";
import { BsMoon, BsSun } from "react-icons/bs";
import { motion } from "motion/react";

function DarkModeToggle() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <motion.button 
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.9 }}
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer shadow-md"
    >
      {darkMode ? (
        <BsSun className="text-yellow-400 w-5 h-5" />
      ) : (
        <BsMoon className="text-gray-900 w-5 h-5" />
      )}
    </motion.button>
  );
}

export default DarkModeToggle;