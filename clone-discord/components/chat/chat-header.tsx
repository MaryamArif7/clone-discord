
//21.1

import { Hash } from "lucide-react";
//interface has both the channel and converstion as type because one: we are gonna have both have the channel one to one member converstaion and two: for audio and vido chnnel
interface ChatHeaderProps{
    serverId:string;
    name:string;
    type:"channel"| "conversation";
    imageUrl?:string;
}
export const ChatHeader=({
    serverId,
    name,
    type,
    imageUrl
}:ChatHeaderProps)=>{
    return(
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            chat header
            </div>

    )
}