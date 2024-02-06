import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
/*20....when the user comes to the  discord they should redirected to the general channel the initail channel
in this module we will checkk for the profile if the user is sined in then check for the if the user is in the server then 
the first channel should be general channel  if there is no genral channel which technically is not possible
 then return null if there is a geernal channel then return the general channel 
 //no  use client because this is the server component */

interface ServerIdPageProps{
    params:{
        serverId:string;
    }
};


const ServerIdPage=async({
    params
}:ServerIdPageProps)=>{
    const profile=await currentProfile();
    if(!profile){
        return redirectToSignIn();
    }
    const server=await db.server.findUnique({
        where:{
            id:params.serverId,
            members:{
                some:{
                    profileId:profile.id,
                }
            }
        },
        include:{
           channels:{
            where:{
                name:"general"
            },
            orderBy:{
                createdAt:"asc"
            }
           }
        }
    })
    const initialChannel=server?.channels[0];
    if(initialChannel?.name!=="general"){
        return null;
    }

    
        return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
    
}
export default ServerIdPage; 