//11.4:serversidebar
import { Server,Member, Profile } from "@prisma/client"

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
  };