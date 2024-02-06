"use client";
//13.1 Modal for invite: modified the create server model to mke the invite modal 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";;

export const InviteModal = () => {
  const {onOpen, isOpen,onClose,type ,data}=useModal();
  //extracted data from useModal
  //the hook from the use orign
  const [copied,setCopied]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const origin=useOrigin();
  const { server } =data;
  const isModalOpen=isOpen && type== "invite"
  // the  value of inviteURL is passed down to the value 
  //here we are cooncatenate the origin varaible with the invite code of the erver object using tempplate
  //literals  and inicte code we will get is from our databse
  const inviteUrl=`${origin}/invite/${server?.inviteCode}`;
  //extrcting server from the data
  //when the link in not copied yet the copy icon will be shown
  //when its get copied then the check tick will be shown
  const onCopy=()=>{
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(()=>{
      setCopied(false);
    },1000);
  }
  //we will  be usin the xios patch to refesh the code
  const onNew=async()=>{
    try {
   setIsLoading(true);
   const response=await axios.patch(`/api/servers/${server?.id}/invite-code`)
   onOpen("invite",{server:response.data}); 
  
  }
    catch (error){
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Your Friends
          </DialogTitle>
           </DialogHeader>
          <div className="p-6">
            <Label className="uppercase text-xs font-bold
             text-zinc-900 dark:text-secondary/70" >Server Invite Link</Label>
          <div className="flex itmes-center mt-2 gap-x-2">
          <Input
          disabled={isLoading}
          className="bg-zinc-300/50 border-0 focus-visible:ring-offset-0"value={inviteUrl}/>
          <Button 
          disabled={isLoading}
          onClick={onCopy}size="icon" >
            {copied ? 
            <Check  className="w-4 h-4"/> : 
            <Copy className="w-4 h-4" />}
           </Button>
          </div>
          <Button 
          onClick={onNew}
          disabled={isLoading}
           className="text-xs text-zinc-500 mt-4">
            Generate new link 
            <RefreshCw className="w-4 h-4 ml-2"/>
          </Button>
          </div>
         

      </DialogContent>
    </Dialog>
  )
}
{/*notes :generatew new link : if the users tries to send the old link to the some other user it will not work  because it changed in the database because if we can
invalidate link if we dont want them to the spread   */}