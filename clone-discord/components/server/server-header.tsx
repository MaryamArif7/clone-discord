"use client";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole} from "@prisma/client";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
interface ServerHeaderProps{
 //11.3:serversidebar:
  /*   cant use the prisma server beacuse this server also has memebers channels
  and it has profiles of those members this server does not have all types which server had in the server side
bar so we need to create the types file for this server if we dont use the server of serverwithmemberswith profiles
it will give error whenb we distruct members from the server */
    server:ServerWithMembersWithProfiles;
    role?:MemberRole;
};
export const ServerHeader =({
    server,
    role 
}:ServerHeaderProps)=>{
  //12.3 after adding types in use modal store for the onopen 
  const { onOpen}=useModal();
    const isAdmin=role===MemberRole.ADMIN;
    const isModerator=isAdmin||role=== MemberRole.MODERATOR;
    return (
      //12.1 added the  Dropdownmenu items
      <DropdownMenu>
      <DropdownMenuTrigger
        className="focus:outline-none" 
        asChild
      >
        <button
          className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
        >
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
      >
      {/*12.4 opening the modal for invite when clicks on the onOpen */}
        {isModerator && (

          <DropdownMenuItem
          onClick={() => onOpen("invite", { server })}
            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto " />
          </DropdownMenuItem>
        )}
        {/**14.3... edit server modal */}
         {isAdmin && (
          <DropdownMenuItem
            onClick={()=>onOpen("editServer",{server})}
            className=" px-3 py-2 text-sm cursor-pointer"
          > 
            Server Settings
            <Settings className="h-4 w-4 ml-auto " />
          </DropdownMenuItem>
        )}
        {/**15.4  */}
         {isAdmin && (
          <DropdownMenuItem
          onClick={()=>onOpen("members",{server})}
            className=" px-3 py-2 text-sm cursor-pointer"
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto " />
          </DropdownMenuItem>
        )}
         {isModerator && (
          <DropdownMenuItem
          onClick={()=>onOpen("createChannel")}
            className=" px-3 py-2 text-sm cursor-pointer"
          >
            Create Channel 
            <PlusCircle className="h-4 w-4 ml-auto " />
          </DropdownMenuItem>
        )}
         {isModerator && (
          <DropdownMenuSeparator />
         )}
        {/** delte server was not working and it ws giving the error because {server }  ws not pssed*/}
      {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteServer", { server })}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
  {!isAdmin && (
          <DropdownMenuItem
        onClick={()=>onOpen("leaveServer",{server})}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            Leave the Server
            <LogOut className="h-4 w-4 ml-auto " />
          </DropdownMenuItem>
        )}
        </DropdownMenuContent>
        </DropdownMenu>
    )
}