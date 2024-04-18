import axios from "axios";
import React, { useEffect, useState } from "react";

interface Chat {
  isGrupChat: boolean;
  users: string[];
  _id: string;
  chatName: string;
}

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://127.0.0.1:3000/api/chats");
      setChats(response?.data?.data);
    })();
  });
  return (
    <div>
      {chats.map((item: Chat) => {
        return <li key={item._id}>{item.chatName}</li>;
      })}
    </div>
  );
};

export default ChatPage;
