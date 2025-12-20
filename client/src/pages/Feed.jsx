import { useEffect, useState } from "react";
import { dummyPostsData } from "../assets/assets.js";
import Loading from "../components/Loading.jsx";
import StoriesBar from "../components/StoriesBar.jsx";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className="relative bg-sky-100/80 min-h-screen overflow-hidden no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      <div className="absolute -top-30 -right-30 w-150 h-150 bg-linear-to-bl from-indigo-300/50 to-sky-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-180 h-100 bg-linear-to-tr from-purple-300/20 bg-indigo-500/20 rounded-full blur-3xl" />
      {/* <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-120 h-120 bg-cyan-500/20 rounded-full blur-2xl" /> */}

      {/* Stories and post list */}
      <div>
        <StoriesBar />
        <div className="p-4 space-y-6"></div>
      </div>

      {/* Right sidebar */}
      <div></div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
