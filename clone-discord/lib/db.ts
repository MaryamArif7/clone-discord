//5.4 prisma setup : npm i prisma cleint 
// then the below whole lines
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
};
// if we are working in production then add the only below this line without global this.prisma 
// we are uisng globalthis : there is something called hot reload and if left it  then this line
// will change and everytime a prisma cleint will be intialized  so we appended this prisma client  to a variable
// whoich is globalthis.prisma  because global this is not affected by the hot reload 
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
