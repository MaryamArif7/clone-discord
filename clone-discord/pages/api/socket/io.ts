//24 socket io : install socket io and socket io client then made the io file in the pages 
//folder not in the app folder because it next 13 still has some issues tht why we cant create in the app folder 
import {Server as NetServer} from "http";
import { NextApiRequest } from "next";
import {Server as ServerIO} from "socket.io";
//worked in types.ts file
import { NextApiResponseServerIo } from "@/types";

export const config ={
    api:{
        bodyParser:false,
    },
};
const ioHandler=(req:NextApiRequest,res:NextApiResponseServerIo)=>{
    if(!res.socket.server.io){
        const path="/api/socket/io";
        const httpServer:NetServer=res.socket.server as any;
        const io =new ServerIO(httpServer,{
            path:path,
            addTrailingSlash:false,
        });
        res.socket.server.io=io;
    }
    res.end();
}
export default ioHandler;
