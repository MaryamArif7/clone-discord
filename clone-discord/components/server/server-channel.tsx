"use client"

import { cn } from "@/lib/utils";
import { Channel, ChannelType, Member, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useModal,ModalType} from "@/hooks/use-modal-store";

import { ActionTooltip } from "../action-tooltip";
import { channel } from "diagnostics_channel";

//19.5
interface ServerChannelProps{
    channel:Channel;
    server: Server;
    role?:MemberRole;
}

//iconmap is an object
const iconMap={
[ChannelType.TEXT]:Hash,
[ChannelType.AUDIO]:Mic,
[ChannelType.VIDEO]:Video,

}
export const ServerChannel=({
    channel,
    server,
    role
}:ServerChannelProps)=>{
    const {onOpen}=useModal();
    const params=useParams();
    const router=useRouter();
    const Icon=iconMap[channel.type];
    //20.1...
//this global onClick funcntion is overirding the below onclick functins so inorder to 
    const onClick=()=>{
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
    }
    //so to stop overriding onclick functions ,we should call onction functions below instead of onopen
    const onAction=(e:React.MouseEvent,action:ModalType)=>{
        e.stopPropagation();
        onOpen(action,{channel,server});
    }
    return (
    <button
    onClick={onClick}
    className={cn(
        "group px-2 rounded-md flex items-center gap-x-2  w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId===channel.id && "bg-zinc-700/20"
    )}>
<Icon 
className="flex-shrink-0 w-5 h-5 text-zinc-500
dark:text-zinc-400"
/>
<p className={cn(
    "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
    params?.channelId===channel.id&& "text-primary dark:text-zinc-200 dark:group-hover:text-white"
)}>
{channel.name}
</p>
{channel.name!=="general" && role!==MemberRole.GUEST&&(
    <div
    className="ml-auto flex items-center gap-x-2">
        <ActionTooltip label="Edit">
        <Edit 
       onClick={(e)=>onAction(e,"editChannel")}
        className="hidden group-hover:block w-4 h-4 text-zinc-500
        hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
        />
      </ActionTooltip>
       <ActionTooltip label="Delete">
       <Trash
     onClick={(e)=>onAction(e,"deleteChannel")}
       className="hidden group-hover:block w-4 h-4 text-zinc-500
       hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
       />
     </ActionTooltip>
</div>
)}
{channel.name==="general" &&(
    <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
)}
    </button>
    )
}