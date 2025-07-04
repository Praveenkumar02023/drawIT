import { json } from "stream/consumers";

export const useSocket = (token : string , roomId : string) => {

  
     const ws = new WebSocket(`ws://localhost:8005?token=${token}`);
    
    if(!ws)return;

    ws.onopen = () => {
        console.log("socket connected!");
        
        ws.send(JSON.stringify({
            "type" : "join_room",
            "roomId"  : roomId
        }));
        console.log(roomId);
        
        // ws.send(JSON.stringify({
        //     "type" : "chat",
        //     "message" : "hello",
        //     "roomId"  : roomId
        // }));
    }

    ws.onmessage = (event) => {

        console.log(event);
    }
    
    ws.onclose = ()=>{
        console.log("socket closed!");
    }

    return ws;

}