import { WebSocket, WebSocketServer } from "ws";
import { parse } from "url";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { log } from "console";


interface User {
  ws: WebSocket;
  roomId: string[];
  userId: string;
}

const users: User[] = [];

const ws = new WebSocketServer({ port: 8005 });

function decodeToken(token: string): null | string {
    
    try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded == "string") {
    return null;
  }

  if (!decoded || !decoded.userId) {
    return null;
  }

  return decoded.userId;
  } catch (error) {
    return null;
  }
}

ws.on("connection", (ws, req) => {

// console.log("New connection from:", req.url);


  const { query } = parse(req.url || "", true);

  const token = query?.token as string;
// console.log("Received token:", token);

  if (!token) {
    ws.close();
    return;
  }

  const userId = decodeToken(token);

  if (!userId) {
    ws.close();
    return;
  }

  
    users.push({
      ws: ws,
      userId: userId,
      roomId: [],
    });
  

  ws.on("error", console.error);

  ws.on("message", (data) => {
    const parsedData = JSON.parse(data.toString());

    if (parsedData.type == "join_room") {

        log(parsedData)

      users.map((u) => {
        u.userId == userId ? u.roomId.push(String(parsedData.roomId)) : null;
      });
    }

    if (parsedData.type === "leave_room") {
      users.forEach((u) => {
        if (u.userId === userId) {
          u.roomId = u.roomId.filter((id) => id !== parsedData.roomId);
        }
      });
    }

    if (parsedData.type === "chat") {
      users
        .filter((u) => u.roomId.includes(String(parsedData.roomId)))
        .forEach((u) => {
          u.ws.send(parsedData.message);
        });
    }
  });

});
