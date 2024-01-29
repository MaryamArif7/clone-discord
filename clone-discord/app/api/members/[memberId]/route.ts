//15.3
{/**patch function finds the server using the server id and cuurent profile id as an admin
 looks throught the members it finds the memebrs  that matches the memeber id param it checks that 
its not currnetly lgged in memeber then it updates the memeber role from whatever
role we are gonna pss through it also includes members and thier profiles 
ordered by ascending order */}
{/** for the dlete function we have not made the option dots on the front end but we are also protecting the api too so the user doesnt delte themselves 
accidently so its importnt to that for the security purpoes not only  for front end but for the back end too 
the update after delete function :
we are updaritng the serve which matches the serves id so  where the current user is dmin
and we are looking throught the memebrs we gonna delete that member which mathces the member id  not the profile id we sow dont want the user to dlete themseleves 
 then we include the memebers and thier profiles because we need them*/}
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { memberId: string } }
  ) {
    try {
      const profile = await currentProfile();
      const { searchParams } = new URL(req.url);
  
      const serverId = searchParams.get("serverId");
  
      if (!profile) {
        return new NextResponse("Unauthorized" ,{ status: 401 });
      }
  
      if (!serverId) {
        return new NextResponse("Server ID missing", { status: 400 });
      }
  
      if (!params.memberId) {
        return new NextResponse("Member ID missing", { status: 400 });
      }
  
      const server = await db.server.update({
        where: {
          id: serverId,
          profileId: profile.id,
        },
        data: {
          members: {
            deleteMany: {
              id: params.memberId,
              profileId: {
                not: profile.id
              }
            }
          }
        },
        include: {
          members: {
            include: {
              profile: true,
            },
            orderBy: {
              role: "asc",
            }
          },
        },
      });
  
      return NextResponse.json(server);
    } catch (error) {
      console.log("[MEMBER_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }

export async function PATCH(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();
        const serverId = searchParams.get("serverId");
        if (!serverId) {
            return new NextResponse("server id is missing", { status: 400 });
        }
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!params.memberId) {
            return new NextResponse("member id is missing", { status: 400 });
        }
        // Making sure that the admin doesn't update the role of themselves
        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id,
                            },
                        },
                        data: {
                            role,
                        },
                    },
                },
            },
            include:{
                members:{
                    include:{
                        profile:true,
                    },
                    orderBy:{
                        role:"asc"
                    }
                  
                    
                }
            }
        });
        return NextResponse.json(server);
    } catch (error) {
        console.log("MEMBERS_ID_PATCH", error);
        return new NextResponse("internal server error", { status: 500 });
    }
}
