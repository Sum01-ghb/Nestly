import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import MenuItems from "./MenuItems.jsx";
import { CirclePlus, LogOut } from "lucide-react";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const { signOut } = useClerk();

  return (
    <div
      className={`fixed w-60 xl:w-72 bg-linear-to-b from-sky-100 to-blue-200 border-r border-indigo-400/50 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${
        sidebarOpen ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="w-full">
        <img
          src={assets.logo}
          alt=""
          className="w-32 ml-7 -mt-5 -my-5 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <hr className="border-indigo-300 mb-8" />

        <MenuItems setSidebarOpen={setSidebarOpen} />
        <Link
          to="/create-post"
          className="flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-linear-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-800 active:scale-95 transition text-white cursor-pointer"
        >
          <CirclePlus className="w-5 h-5" />
          Create Post
        </Link>
      </div>

      <div className="w-full border-t border-indigo-300 p-4 px-7 flex items-center justify-between">
        <div className="flex gap-2 items-center cursor-pointer">
          <UserButton />
          <div>
            <h1 className="text-sm font-medium">{user.full_name}</h1>
            <p className="text-xs text-gray-500">@{user.username}</p>
          </div>
        </div>
        <LogOut
          className="w-5 text-indigo-600/95 hover:text-indigo-800 transition cursor-pointer"
          onClick={signOut}
        />
      </div>
    </div>
  );
};

export default Sidebar;
