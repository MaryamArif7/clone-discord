import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
//13.4 *(how dyanamic and organazational folder works)
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
};

const InviteCodePage = async ({
  params
}: InviteCodePageProps) => {
  //fetch the current profile 
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }
//check either we have the inite or not 
  if (!params.inviteCode) {
    return redirect("/");
  }
  {/**if we match the invite code of the server we are trying to jon 
and if we are already memebr of that server then dont need to join the server 
and then redirect the user to that server already  */}
//checking if the user is already part of the server 
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });
// if it is part of the server then redirect them to the server 
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }
  //otherwise just update the sever with new invite code 
  //we modified the data modiefied the members and added a new profile id 
// copy the server inivte link t test either it is working or  not 
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          }
        ]
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  
  return null;
}
 
export default InviteCodePage;