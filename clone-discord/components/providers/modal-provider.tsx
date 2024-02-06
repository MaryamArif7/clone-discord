"use client"/*  when we use use client that does not mean this is not rendering o server side rendering 
tis is still server side rendering all this means is its not a react server component both react server components and
use cleints components are in server side rendering  but use client means that its also render on the client side thats why 
its creates  hydreation error if one state is render on  the server and other state is render on the client side
so modaal are on the client sidde */
//10.3:Server Modal :
import { CreateServerModal } from "@/components/modals/create-server-modal.";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";
import { DeleteServerModal } from "../modals/delete-server-modal";
import { DeleteChannelModal } from "../modals/delete-channel-modal";
import { EditChannelModal } from "../modals/edit-channel-modal ";
export const ModalProvider=()=>{
    const [isMounted, setIsMounted]=useState(false);
    /*this is preventing modals to be rendered on the server side because
    that can create incosistence  thus createing hydration error 
    */
    useEffect(()=>{
        setIsMounted(true);
    },[]);
    if(!isMounted){
        return null;
    }
    return (
        <>
       <CreateServerModal />
       <InviteModal />
    {/** edit server modl */}
      <EditServerModal />
      {/**15.3 addding members modal */}
      <MembersModal />
      {/**16.3 Create channel modl */}
       <CreateChannelModal />
       {/** 17.3 leave server modal compionenet rendering  */}
       <LeaveServerModal />
       {/**18.3....Delete server modal  */}
       <DeleteServerModal/>
        {/**19......Delete channel modal  */}
        <DeleteChannelModal />
        {/**19.... Edit channel Modal */}
        <EditChannelModal/>
        </>
    )
}