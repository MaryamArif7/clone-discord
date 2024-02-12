
//21.1

import { channel } from "diagnostics_channel";
import { Hash } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
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
           <MobileToggle  serverId={serverId}/>
           {type==="channel" &&(
            <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
           )}
           {/** the name on the top of chat header after hash sign */}
           <p className="font-semibold text-md text-black dark:text-white">
            {name}
           </p>

            </div>

    )
}