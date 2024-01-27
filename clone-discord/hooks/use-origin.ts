//13.2 : working on the invite modal: 
import { useEffect, useState } from "react";
export const useOrigin=()=>{
    const [mounted,setMounted]=useState(false);
    useEffect(()=>{
        setMounted(true);

    },[]);
    /*origin is a tyoe of window so if the type of the window  is not defined 
    and if we have the window location dot origin in that case render the window.location.origin
     otherwise render the empty string */
    const  origin=typeof window!=="undefined" && window.location.origin ? window.location.origin:""
    if(!mounted){
        return "";

    }
    return origin;
}