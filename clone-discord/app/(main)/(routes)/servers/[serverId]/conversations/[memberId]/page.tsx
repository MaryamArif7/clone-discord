import { ChatHeader } from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

//23
interface MemberIdPageProps{
    params:{
        memberId:string;
        serverId:string;
    }
}

const MemberIdPage = async({
    params
}:MemberIdPageProps)=> {
    const profile=await currentProfile();
    if(!profile){
        return redirectToSignIn();
    }
    const  currentMember=await db.member.findFirst({
        where:{
            serverId:params.serverId,
            profileId:profile.id,
        },
  include:{
profile:true,
  },
    });
    if(!currentMember){
        redirect("/")
    }
    const conversation=await getOrCreateConversation(currentMember.id , params.memberId);
if(!conversation){
    return redirect(`/servers/${params.serverId}`);
}
const {memberOne,memberTwo}=conversation;
{/** what we are doing is we are compring both of the members looking at their profile ids
if it matches with our current profile id  we are picking up the oposite member  we want the other member  
both persons can initiate the conversations if we initaed the conversation then we are the member one */}
const otherMember=memberOne.profileId===profile.id? memberTwo : memberOne;
    
    return (  
        <div className="bg-white dark:bg-[#31338] flex flex-col h-full">
            <ChatHeader 
            imageUrl={otherMember.profile.imageUrl}
            name={otherMember.profile.name}
            serverId={params.serverId}
            type="conversation"
            
            />
        </div>
    );
}
 
export default MemberIdPage;