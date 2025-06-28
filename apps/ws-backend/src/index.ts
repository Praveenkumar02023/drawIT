import { WebSocketServer } from "ws";
import {parse} from 'url'
import jwt from 'jsonwebtoken'

const ws = new WebSocketServer({port : 8005});

ws.on('connection',(ws ,req)=>{

    const { query } = parse(req.url || '' , true);

    const token = query?.token as string;

    if(!token){

        ws.close();
        return;

    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET!);

    if(typeof decoded == "string"){
        ws.close();
        return
    }

    if(!decoded || !decoded.userId){
        ws.close();
        return
    }

    ws.on('error',console.error)

    ws.on('message',(data)=>{
        console.log(data.toString());
    })

    ws.send('something');
    ws.send('hi there');
})