"use client";
//15.2 Modal for  memebrs : modified the invite model to make the member modal 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent

}
from "@/components/ui/dropdown-menu";

import qs from "query-string";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
//created a cnst object whcih is roleiconmap 
const roleIconMap={
  "GUEST":null,
  "MODERATOR":<ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  "ADMIN": <ShieldAlert  className="h-4 w-4 text-purple-500"/>
}

export const MembersModal = () => {
  const {onOpen, isOpen,onClose,type ,data}=useModal();
  const [loadingId, setLoadingId] = useState("");
  const router=useRouter();
//15.2 mnanaging the members
//the member typescript error fix
  const { server } =data as{ server:ServerWithMembersWithProfiles}
  const isModalOpen=isOpen && type== "members"
  const onKick=async(memberId:string)=>{
    try{
       setLoadingId(memberId);
       const url=qs.stringifyUrl({
        url:`/api/members/${memberId}`,
        query:{
          serverId:server?.id,
        }
       });
       const response=await axios.delete(url);
       router.refresh();
       onOpen("members",{server:response.data});
    } catch(error){
    console.log(error);
    }
    finally{
    setLoadingId("");
    }
  }
  const onRoleChange=async(memberId:string,role:MemberRole)=>{
    try{
      setLoadingId(memberId);
      const url=qs.stringifyUrl({
        url:`/api/members/${memberId}`,
        query:{
          serverId:server?.id,
         // dont need the "memberId" here because we are passing it at baove
        }
      });
      const response =await axios.patch(url,{role})
      router.refresh();
      onOpen("members",{server:response.data});
    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoadingId("");
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black  overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage mebers
          </DialogTitle>
           {/* the below member was giving an error . in the use modal
           store we have defined the modal data:as the server but now we used it as the members 
           so we need to fix the error for this , this is a typescript error
           we we added the serverwithmemberswithprofiles from the types above for the const {server } */}
           <DialogDescription className="text-center text-zinc-500 ">
            {server?.members?.length} Members
           </DialogDescription>
           </DialogHeader>
           <ScrollArea className="mt-8 max-h-[420px] pr-6">
            {server?.members?.map((member)=>(
              <div key={member.id} className="flex items-center 
              gap-x-2 mb-6">
                <UserAvatar  src={member.profile.imageUrl}/>
                <div className="flex flex-col gap-y-1">
                  <div className="text-xs font-semibold flex items-center gap-x-1">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                  </div>
                  <p className=" text-xs text-zinc-800">
                    {member.profile.email}
                  </p>

                </div>
                {/** adding the options for the qdmin to mange the members what we can do is dont show the options 
                 * for the admin just show the options for the guest , the options cna be kick the gust out of the server or chnage the role of the guest anf 
                 * this can be only done by the admin
                 */}
                {server.profileId!==member.profileId &&
                loadingId!==member.id &&(
                    <div
                    className="ml-auto">
                      <DropdownMenu >
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 text-zinc-500 "/>
                        </DropdownMenuTrigger>
                       <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>
                              role
                            </span>

                          </DropdownMenuSubTrigger>
                         <DropdownMenuPortal>
                          <DropdownMenuContent>
                            <DropdownMenuItem 
                            onClick={()=>onRoleChange(member.id,"GUEST")}>
                              <Shield className="h-4 w-4 mr-2"/>
                              Guest 
                              {member.role==="GUEST"&&(
                                <Check 
                                className="h-4 w-4 ml-auto"
                                />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                             onClick={()=>onRoleChange(member.id,"MODERATOR")}>
                              <ShieldCheck className="h-4 w-4 mr-2"/>
                              Moderartor
                              {member.role==="MODERATOR"&&(
                                <Check 
                                className="h-4 w-4 ml-auto"
                                />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                         </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                         <DropdownMenuItem
                         onClick={()=>onKick(member.id)}
                         >
                         <Gavel className="h-4 w-4 mr-2" />
                                kick
                               </DropdownMenuItem>
                       </DropdownMenuContent>
                    </DropdownMenu>
                   </div>
                )}
                {loadingId===member.id &&(
                  <Loader2 
                  className="animate-spin text-zinc-500 ml-auto w-4 h-4"
                  />
                )  }
              </div>
            ))}

           </ScrollArea>

      
      </DialogContent>
    </Dialog>
  )
}