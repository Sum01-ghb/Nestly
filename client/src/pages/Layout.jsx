import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Loading from "../components/Loading.jsx";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../features/sidebar/sidebarSlice";

const Layout = () => {
  const user = useSelector((state) => state.user.value);
  const sidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const viewStory = useSelector((state) => state.story.viewStory);
  const dispatch = useDispatch();

  return user ? (
    <div className="w-full flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 bg-slate-50">
        <Outlet />
      </div>
      {!viewStory && (
        <>
          {sidebarOpen ? (
            <X
              className="absolute top-3 right-3 sm:right-10 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            />
          ) : (
            <Menu
              className="fixed top-3 right-3 sm:right-10 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            />
          )}
        </>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Layout;
