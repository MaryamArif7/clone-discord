"use client";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole} from "@prisma/client";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
interface ServerHeaderProps{
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
    const isAdmin=role===MemberRole.ADMIN;
    const isModerator=isAdmin||role=== MemberRole.MODERATOR;
    return (
        <DropdownMenu>
        <DropdownMenuTrigger
          className="focus:outline-none" 
          asChild
        >
          <button
            className="w-full text-md font-semibold
             px-3 flex items-center h-12
              border-neutral-200 dark:border-neutral-800
               border-b-2 hover:bg-zinc-700/10
                dark:hover:bg-zinc-700/50 transition"
          >
            {server.name}
            <ChevronDown className="h-5 w-5 ml-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
        className="w-56 text-xs font-medium text-black
        dark:text-neutral-400 space-y-[2px]">    
        {isModerator && (
            <DropdownMenuItem className="text-indigo-600 dark:text-indigo-400
            px-3 py-2 text-sm cursor-pointer" >
                Invite people
            </DropdownMenuItem>
        )}        
        </DropdownMenuContent>
        </DropdownMenu>
    )
}