
/* in the interface params we have server id and channel id that is because we are in the 
page tsx which is inside of both serverid and channelid  so both atre gonna be in the URL so we have gona them 
inside of every server compoenent  */
    /* we fetch the channel which holds the channel id 
    we found the member using the server id  and its respective profile id
    so the thing is when we join the serer we become the new member but still we are members of many server 
     so we are chehcking for that profile id which is in that server in the member fecth...not using  findunique because thta not defined in the schema thta why using findfist*/
     import { redirectToSignIn } from "@clerk/nextjs";
     import { redirect } from "next/navigation";
     import { ChannelType } from "@prisma/client";
     
     import { currentProfile } from "@/lib/current-profile";
     import { ChatHeader } from "@/components/chat/chat-header";
     import { ChatInput } from "@/components/chat/chat-input";
     import { ChatMessages } from "@/components/chat/chat-messages";
     import { MediaRoom } from "@/components/media-room";
     import { db } from "@/lib/db";
     
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
           <ChatHeader
             name={channel.name}
             serverId={channel.serverId}
             type="channel"
           />
           {channel.type === ChannelType.TEXT && (
             <>
             {/* 28.1.... compenenet for chat messages  */}
               <ChatMessages
                 member={member}
                 name={channel.name}
                 chatId={channel.id}
                 type="channel"
                 apiUrl="/api/messages"
                 socketUrl="/api/socket/messages"
                 socketQuery={{
                   channelId: channel.id,
                   serverId: channel.serverId,
                 }}
                 paramKey="channelId"
                 paramValue={channel.id}
               />
               <ChatInput
                 name={channel.name}
                 type="channel"
                 apiUrl="/api/socket/messages"
                 query={{
                   channelId: channel.id,
                   serverId: channel.serverId,
                 }}
               />
             </>
           )}
           {channel.type === ChannelType.AUDIO && (
             <MediaRoom
               chatId={channel.id}
               video={false}
               audio={true}
             />
           )}
           {channel.type === ChannelType.VIDEO && (
             <MediaRoom
               chatId={channel.id}
               video={true}
               audio={true}
             />
           )}
         </div>
        );
     }
      
     export default ChannelIdPage;