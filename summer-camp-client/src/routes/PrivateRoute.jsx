import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spiner from "../pages/share/Spinner/Spinner";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({children}) => {
    
    const{user,loading} = useContext(AuthContext)
    const location = useLocation()
    console.log(location)


    if(loading){
       return  <Spiner></Spiner>
    }

   if(user){
        return children
    }

    return  <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;