"use client";

import axios from "axios";
import { randomInt } from "crypto";


import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatRoom = () => {
  const params = useParams();
  const slug = params.slug;

  const [roomId, setRoomId] = useState<number | null>(null);
  const [ws, setWS] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[] | null>(null);
  const [chat, setChat] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;  
    const token = localStorage.getItem("jwt_token");
    
    const ws = new WebSocket(
      `ws://localhost:8005?token=${token}`
    );

    setWS(ws);

    const createRoom = async () => {
  const token = localStorage.getItem("jwt_token");

  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/create-room",
      { slug },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Room response:", response.data);
    setRoomId(response.data.roomId);
  } catch (err: any) {
    console.error("🔥 Axios Error:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });
  }
};


    createRoom();

    ws.onopen = () => {
      console.log("web socket connected");
    };

    ws.onmessage = (event : any) => {

      if (!event || typeof event.data !== "string") return;

  console.log("Raw WS message:", event.data);

  try {
    const parsedData = JSON.parse(event.data);
    setMessages((prev) => [...(prev || []), parsedData.message || ""]);
  } catch (err) {
    console.warn("❌ Invalid JSON message:", event.data);
  }

    };

    ws.onclose = () => {
      console.log("ws closed");
    };

    return () => {
      ws.close();
    };
  }, [slug]);


    useEffect(() => {
    if (roomId && ws?.readyState === WebSocket.OPEN) {
      ws?.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );
    }
  }, [roomId]);



  const sendMessage = () => {
    if (ws && chat?.trim() && roomId) {
      const payload = {
        type: "chat",
        roomId: roomId,
        message: chat,
      };

      const data = JSON.stringify(payload);

      ws.send(data);
      setMessages((prev) => [...(prev || []), payload.message || ""]);
      setChat("");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="h-[60%] w-[100%] ">

        <ul>
          {
          messages?.map((m,i) => (
            <li key={`${m}-${i}`} >{m}</li>
          ))
          }
        </ul>

      </div>
      <div className="flex items-center justify-center h-[40%] w-[100%]">
        <div className="p-10 h-[40%] w-[100%] flex justify-center items-center ">
          <input
            onChange={(e) => {
              setChat(e.target.value);
            }}
            type="text"
            className="h-10 w-[50%] bg-gray-600 text-white rounded-xl px-4 "
            placeholder="type message.."
          />
          <button
            className="bg-gray-900 h-10 rounded-xl text-white px-4 hover:bg-gray-600 hover:animate-pulse"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ChatRoom;
