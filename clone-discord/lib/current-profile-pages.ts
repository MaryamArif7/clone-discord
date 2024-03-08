//26 :Message api copied the current profile compenent
import { getAuth } from "@clerk/nextjs/server";
// we are checking that if user is already logged in 
import { db } from "@/lib/db";
import { NextApiRequest } from "next";

export const currentProfilePages = async (req:NextApiRequest) => {
  const { userId } = getAuth(req);
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