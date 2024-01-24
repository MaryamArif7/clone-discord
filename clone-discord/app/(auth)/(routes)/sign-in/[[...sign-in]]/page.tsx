import { SignIn } from "@clerk/nextjs";
// 3.3 authentication :auth nd routes which are in the brackets are the organiztional folder 
// which mens they will not be shown  in the url the sign in file  which is in t 
// double brackets is followin the next 13 convention woch is exposing all the necassary routes  for clerk to work inside of the app router
 // the folder name and the file name with the brackets has to  be the same to make work the sign in part 
export default function Page() {
  return <SignIn />;
}