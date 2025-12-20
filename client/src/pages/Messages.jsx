import { Eye, MessageSquare } from "lucide-react";
import { dummyConnectionsData } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-linear-to-br from-violet-100 to-sky-100 pl-0 lg:pl-60 xl:pl-72 no-scrollbar overflow-hidden">
      <div className="absolute z-0 -top-30 -right-30 w-150 h-150 bg-linear-to-bl from-indigo-300/50 to-sky-300/30 rounded-full blur-2xl" />
      <div className="absolute z-0 -bottom-10 -left-2 w-200 h-120 bg-linear-to-tr from-purple-300/20 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto p-6 z-40">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Messages</h1>
          <p className="text-slate-600">Talk to your friends and family</p>
        </div>

        {/* Connected Users */}
        <div className="flex flex-col gap-3 z-20">
          {dummyConnectionsData.map((user) => (
            <div
              key={user._id}
              className="max-w-xl flex flex-wrap gap-5 p-6 bg-white shadow rounded-md z-10"
            >
              <img
                src={user.profile_picture}
                alt=""
                className="rounded-full size-12 mx-auto"
              />
              <div className="flex-1">
                <p className="font-medium text-slate-700">{user.full_name}</p>
                <p className="text-slate-500">@{user.username}</p>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => navigate(`/messages/${user._id}`)}
                  className="size-10 flex items-center justify-center text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 transition cursor-pointer gap-1"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className="size-10 flex items-center justify-center text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 transition cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
