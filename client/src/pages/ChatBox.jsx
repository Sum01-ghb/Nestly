import { useEffect, useRef, useState } from "react";
import { Image, SendHorizonal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios.js";
import {
  addMessage,
  fetchMessages,
  resetMessages,
} from "../features/messages/messagesSlice.js";
import { toast } from "react-hot-toast";

const ChatBox = () => {
  const { messages } = useSelector((state) => state.messages);
  const { userId } = useParams();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const connections = useSelector((state) => state.connections.connections);
  const messagesEndRef = useRef(null);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);

  const sendMessage = async () => {
    try {
      if (!text && !image) return;
      const token = await getToken();
      const formData = new FormData();

      formData.append("to_user_id", userId);
      formData.append("text", text);
      image && formData.append("image", image);

      const { data } = await api.post("/api/message/send", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setText("");
        setImage(null);
        dispatch(addMessage(data.message));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserMessages = async () => {
    try {
      const token = await getToken();
      dispatch(fetchMessages({ token, userId }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserMessages();
    return () => {
      dispatch(resetMessages());
    };
  }, [userId]);

  useEffect(() => {
    if (connections.length > 0) {
      const user = connections.find((connection) => connection._id === userId);
      setUser(user);
    }
  }, [connections, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    user && (
      <div className="fixed inset-0 flex flex-col bg-linear-to-br from-violet-100 to-sky-100 pl-0 lg:pl-60 xl:pl-72">
        <div className="absolute z-0 -top-30 -right-30 w-150 h-150 bg-linear-to-bl from-indigo-300/50 to-sky-300/30 rounded-full blur-2xl" />
        <div className="absolute z-0 -bottom-10 -left-2 w-200 h-120 bg-linear-to-tr from-purple-300/20 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="flex items-center gap-2 p-2 md:px-10 xl:px-42 border-b border-indigo-300 bg-linear-to-r from-violet-200 to-blue-200 shrink-0 relative z-20">
          <img
            src={user.profile_picture}
            alt=""
            className="size-8 rounded-full"
          />
          <div>
            <p className="font-medium">{user.full_name}</p>
            <p className="text-gray-500 text-sm -mt-1.5">@{user.username}</p>
          </div>
        </div>

        <div className="p-5 md:px-10 flex-1 min-h-0 relative z-20 overflow-y-auto">
          <div className="space-y-4 max-w-4xl mx-auto pb-4">
            {messages
              .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    message.to_user_id !== user._id
                      ? "items-start"
                      : "items-end"
                  }`}
                >
                  <div
                    className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${
                      message.to_user_id !== user._id
                        ? "rounded-bl-none"
                        : "rounded-br-none"
                    }`}
                  >
                    {message.message_type === "image" && (
                      <img
                        src={message.media_url}
                        alt=""
                        className="w-full max-w-sm rounded-lg mb-1"
                      />
                    )}
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="px-4">
          <div className="flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl mx-auto border border-gray-200 shadow rounded-full mb-5 relative z-10 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition">
            <input
              type="text"
              className="flex-1 outline-none text-slate-700"
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <label htmlFor="image">
              {image ? (
                <img src={URL.createObjectURL(image)} className="h-8 rounded" />
              ) : (
                <Image className="size-7 text-gray-400 cursor-pointer" />
              )}
              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <button
              onClick={sendMessage}
              className="bg-linear-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-800 active:scale-95 transition cursor-pointer text-white p-2 rounded-full"
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatBox;
