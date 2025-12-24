import { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import Loading from "../components/Loading.jsx";
import StoriesBar from "../components/StoriesBar.jsx";
import PostCard from "../components/PostCard.jsx";
import RecentMessages from "../components/RecentMessages.jsx";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/post/feed", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setFeeds(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className="relative bg-linear-to-br from-violet-100 to-sky-100 min-h-screen overflow-hidden pl-0 lg:pl-60 xl:pl-72 no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      <div className="absolute z-0 -top-30 -right-30 w-150 h-150 bg-linear-to-bl from-indigo-300/50 to-sky-300/30 rounded-full blur-2xl" />
      <div className="absolute z-0 -bottom-10 -left-2 w-200 h-120 bg-linear-to-tr from-purple-300/20 bg-indigo-500/20 rounded-full blur-3xl" />
      {/* <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-120 h-120 bg-cyan-500/20 rounded-full blur-2xl" /> */}

      {/* Stories and post list */}
      <div className="z-10">
        <StoriesBar />
        <div className="p-4 space-y-6">
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="max-xl:hidden sticky top-0">
        <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
          <h3 className="text-slate-800 font-semibold">Sponsored</h3>
          <img
            src={assets.sponsored_img}
            alt=""
            className="w-75 h-50 rounded-md"
          />
          <p className="text-slate-600">Email Marketing</p>
          <p className="text-slate-400">
            Supercharge your marketing with a powerful, easy-to-use platform
            built for results.
          </p>
        </div>

        <RecentMessages />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
