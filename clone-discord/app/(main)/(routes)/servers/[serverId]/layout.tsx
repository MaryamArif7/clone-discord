import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerIdLayout=async({
    children ,
    params,
}:{
    children:React.ReactNode;
    params:{ serverId : string};
})=>{
    const profile=await currentProfile();
    if (!profile){
        return redirectToSignIn();
    }
    const server=await db.server.findUnique({
        where:{
            //the server id  is the id of the server whatever we have named the folder tht will be the params.foldername
            id:params.serverId,
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    })
    if(!server){
        return redirect("/");
    }
    return(
        <div>
            {children}
        </div>

    )
}
export default ServerIdLayout