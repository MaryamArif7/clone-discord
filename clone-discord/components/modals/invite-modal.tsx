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
import { Copy, RefreshCw } from "lucide-react";

export const InviteModal = () => {
  const { isOpen,onClose,type}=useModal();
  const isModalOpen=isOpen && type== "invite"
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
          <div className="flex itmes-center mt-2 gap-x-2"></div>
          <Input className="bg-zinc-300/50 border-0 focus-visible:ring-offset-0"value="invite-link"/>
          <Button size="icon" >
            <Copy className="w-4 h-4" />
          </Button>
           
          </div>
          <Button className="text-xs text-zinc-500 mt-4">
            Generate new link 
            <RefreshCw className="w-4 h-4 ml-2"/>
          </Button>

      </DialogContent>
    </Dialog>
  )
}