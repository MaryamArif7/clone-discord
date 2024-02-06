//17.....api for leaving the server

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export  async function PATCH(
    req:Request,
    {params}:{params:{serverId:string }}
)
{
    try{
    const profile=await currentProfile();
    if(!profile){
        return new NextResponse("unauthorized ",{status:401});
        
    }
    if(!params.serverId){
     return new NextResponse("server id is misssing ",{status:400});
    }
    //onle members can leave the server 
    {/*  we are updating the seever that matches the server id  we are only doing this if the person who created the server is not leaving
 the server we are makig sure adminis not leaving the server mkaing sure that the leaving the servers is actully the memeber then we are deleting the member who is mtching 
with that profile id */}
   const server =await db.server.update({
    where:{
        id:params.serverId,
        profileId:{
            not:profile.id
        },
        members:{
            some:{
                profileId:profile.id
            }
        }
    },
    data:{
        members:{
            deleteMany:{
                profileId:profile.id
            }
        }
    }
   })
    return NextResponse.json(server); 

    }catch(error){
        console.log("[SERVER_ID-LEAVE]",error);
        return new NextResponse("internal error",{status:500});
    }
}