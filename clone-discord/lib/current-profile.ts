//5.5 prisma:

import { auth } from "@clerk/nextjs";
// we are checking that if user is already logged in 
import { db } from "@/lib/db";

export const currentProfile = async () => {
  const { userId } = auth();
/*
 auth fun from clerk is called nd it reurns an object whcih contains information about the
about eh currentlu authenticted user then object is destructed to get the information of user id

 */
  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  });

  return profile;
}