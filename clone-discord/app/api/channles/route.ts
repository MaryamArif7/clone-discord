import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";


//16....creation of api for the channles
export async function POST(

    req:Request
){
try{
    const profile=await currentProfile();
    const {name ,type}=await req.json();
    const {searchParams}=new URL(req.url);
    const serverId=searchParams.get("serverId");
if(!profile){
    return new NextResponse("Unauthorized bro",{status:401});
}
if(!serverId){
    return new NextResponse("server id is missing",{status:400})
}
{/** we are just being more careful here what if the user bypass the frontend and 
and gets succed in naming the channel name genral we are going to write code for thta so the user dont later on the app gonna redirect to the
general channel automatically , so tahts why no generla channel , still user can have chnnel name general1 or general2 anytjing lilke that not just generl  */}
if(name=="general"){
    return new NextResponse("Name cannot be 'general'",{status:400});
}
const server=await db.server.update({
    where:{
        id:serverId,
        members:{
            some:{
                profileId:profile.id,
                role:{
                    in:[MemberRole.ADMIN,MemberRole.MODERATOR]
                }
            }
        }
    },
    data:{
        channels:{
            create:{
                profileId:profile.id,
                name,
                type,

            }
        }
    }
});
return NextResponse.json(server);

}
catch(error){
    console.log("CHANNEL_POST",error);
    return new NextResponse("internal error ",{status:500});
}
}