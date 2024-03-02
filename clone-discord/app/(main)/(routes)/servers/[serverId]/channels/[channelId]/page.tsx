
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
//import { ChatMessages } from "@/components/chat/chat-messages";
//import { MediaRoom } from "@/components/media-room";
import { db } from "@/lib/db";
/* in the interface params we have server id and channel id that is because we are in the 
page tsx which is inside of both serverid and channelid  so both atre gonna be in the URL so we have gona them 
inside of every server compoenent  */
interface ChannelIdPageProps {
    params: {
      serverId: string;
      channelId: string;
    }
  }
  const ChannelIdPage = async ({
    params
  }: ChannelIdPageProps) => {
    const profile = await currentProfile();
  
    if (!profile) {
      return redirectToSignIn();
    }
  
    /* we fetch the channel which holds the channel id 
    we found the member using the server id  and its respective profile id
    so the thing is when we join the serer we become the new member but still we are members of many server 
     so we are chehcking for that profile id which is in that server in the member fecth...not using  findunique because thta not defined in the schema thta why using findfist*/
     const channel = await db.channel.findUnique({
        where: {
          id: params.channelId,
        },
      });
    
      const member = await db.member.findFirst({
        where: {
          serverId: params.serverId,
          profileId: profile.id,
        }
      });
    
      if (!channel || !member) {
        redirect("/");
      }
    return (  
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">

            {/* 21.2....passing the props of chat header this is the page thht is rendering the chat page */}
            <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
{/* 25.1  */}
<div className="flex-1"> Future Messges</div>
        <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
            channelId:channel.id,
            serverId:channel.serverId,
        }}
        
        />
        </div>
    );
}
 
export default ChannelIdPage;