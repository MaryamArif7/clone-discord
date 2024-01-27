//the route & file structure 

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
// t generate new invite code we need uuid
import {v4 as uuidv4} from "uuid";
//13.3
export async function PATCH(

    req:Request,
    {params} :{params:{serverId:string}}
){
    try {
      const profile=await currentProfile();
      if(!profile){
        return new NextResponse("Unauthorized",{status:401});
      }
      if(!params.serverId){
        return new NextResponse("Server ID is miissing ",{status:400});
      }
      //below we only neeed to check for the profile id no need to check for the role because
      // the only profile id thats possible to tbe in the server is the creator of the server
      const server=await db.server.update({
        where:{
            id:params.serverId,
            profileId:profile.id,
        },
        data:{
            inviteCode: uuidv4(),
        },
      });
      return NextResponse.json(server);
    }
    catch{
        console.log("[SERVER_ID],error");
        return new NextResponse("INTERNAL SERVER ERROR ",{status:500});
    }
}
    
