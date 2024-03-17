import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { MediaRoom } from "@/components/media-room";

//23
interface MemberIdPageProps {
    params: {
      memberId: string;
      serverId: string;
    },
    searchParams: {
      video?: boolean;
    }
  }
  const MemberIdPage = async ({
    params,
    searchParams,
  }: MemberIdPageProps) => {
    const profile = await currentProfile();
  
    if (!profile) {
      return redirectToSignIn();
    }
  
    const currentMember = await db.member.findFirst({
      where: {
        serverId: params.serverId,
        profileId: profile.id,
      },
      include: {
        profile: true,
      },
    });
  
    if (!currentMember) {
      return redirect("/");
    }
  
    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);
  
    if (!conversation) {
      return redirect(`/servers/${params.serverId}`);
    }
  
const {memberOne,memberTwo}=conversation;
{/** what we are doing is we are compring both of the members looking at their profile ids
if it matches with our current profile id  we are picking up the oposite member  we want the other member  
both persons can initiate the conversations if we initaed the conversation then we are the member one */}
const otherMember=memberOne.profileId===profile.id? memberTwo : memberOne;
return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
      {/** 30.... media room and chat messages  */}
      {searchParams.video && (
        <MediaRoom
          chatId={conversation.id}
          video={true}
          audio={true}
        />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          />
          <ChatInput
            name={otherMember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
   );
}
    
 
export default MemberIdPage;