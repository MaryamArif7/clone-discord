import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";


interface ServerSidebarProps{
    serverId:string;
}
export const ServerSidebar=async({
    serverId
}:ServerSidebarProps)=>{
    const profile=await currentProfile();
        if(!profile){
            return redirect("/");
        }
        const server =await db.server.findUnique({
            where:{
                id:serverId,
            },
            include :{
                channels:{
                    orderBy:{
                        createdAt:"asc",
                    },
                    
                },
                members:{
                    include:{
                        profile:true,
                    },
                    orderBy:{
                        role:"asc",
                    }
                }
            }
        });
        const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
        const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
        const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
        const members = server?.members.filter((member) => member.profileId !== profile.id)
        if(!server){
            return redirect("/");
      } 
      /*look  through at the members and search for matching profile id then we found the member and then check for the role
      */
      const role=server.members.find((member)=>member.profileId===profile.id)?.role;
        
    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#282031] bg-[#F2F3FS] ">
          <ServerHeader 
          server={server}
          role={role}
          
          />
        </div>
    )
}