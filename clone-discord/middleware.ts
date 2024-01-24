// 3.2 authentication : middleware from the clerk provider to protect the routes 
import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
//7.4 uploadting: adding the uploading public routes to avoid the potentil error
export default authMiddleware({  publicRoutes:["/api/uploadthing"]});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
 