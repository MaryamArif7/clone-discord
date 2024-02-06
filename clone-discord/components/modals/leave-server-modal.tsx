"use client";
//17.2 modal for leaving the sever : modified the initve modal 
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
export const LeaveServerModal = () => {
  const { isOpen,onClose,type ,data}=useModal();
  const [isLoading,setIsLoading]=useState(false);
  const { server } =data;
  const isModalOpen=isOpen && type== "leaveServer"
  const router=useRouter();
  const onClick=async()=>{
    try{
  setIsLoading(true);
  await axios.patch(`/api/servers/${server?.id}/leave`);
  onClose();
  router.refresh();
  router.push("/");
    }catch(error){
    console.log(error);
    }
    finally {
        setIsLoading(false);
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leave  Your Server 
          </DialogTitle>
          <DialogDescription  className="text-center text-zinc-500">
            Are  you sure you want to leave the server 
            <span className="font-semibold text-indigo-500"
            >{server?.name}</span>?
          </DialogDescription>
           </DialogHeader>
           <DialogFooter
           className="bg-gray-100 px-6 py-4"
           >
            <div className="flex items-center justify-between w-full">
         <Button
         disabled={isLoading}
         variant="ghost"
         onClick={onClose}
         >Cancel</Button>
         <Button
         disabled={isLoading}
         variant="primary"
         onClick={onClick}>Confirm</Button>
          </div>
           </DialogFooter>
         </DialogContent>
    </Dialog>
  )
}
