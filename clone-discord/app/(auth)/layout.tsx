const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   //the layout page for the sign in 
  return ( 
      <div className="h-full flex items-center justify-center">
        {children}
      </div>
     );
  }
   
  export default AuthLayout;