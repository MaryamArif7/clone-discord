"use client";
//24.3
import { useSocket } from "./providers/socket-provider";
import { Badge } from "lucide-react";
export const SocketIndicator=()=>{
    const {isConnected}=useSocket();
    if(!isConnected){
        return (
            <Badge variant="outline" className="bg-yellow-600 text-white border-none"
            >
                Fallback:polling every 1s 
            </Badge>
        )

        }
    return (
        <Badge variant="outline" className="bg-emerald-600 text-white border-none"
        >
            Live:real time  updates
        </Badge>
    )

}
