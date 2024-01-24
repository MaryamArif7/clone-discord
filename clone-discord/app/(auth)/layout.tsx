const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   //3.4 authentication : the layout page for the sign in any changings we wnat for the sign in page in te ense of he layout can be done here 
  //this layout will reflect to both the sign in and sign up pages which are inside the auth and routes oragnizational folders
  // after sign in and sign in the app will be redireted to the main page of the application  
   return ( 
      <div className="h-full flex items-center justify-center">
        {children}
      </div>
     );
  }
   
  export default AuthLayout;