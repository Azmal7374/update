import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const savedUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };
    //   fetch("https://bistro-boss-server-gray-ten.vercel.app/users", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(savedUser),
    //   })
    //     .then((res) => res.json())
    //     .then(() => {
    //       console.log("From", from);
    //       navigate(from, { replace: true });
    //     });
    });
  };
  return (
    <div>
      <div className="divider  "></div>

      <div className="w-full my-4 text-center">
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-purple-500 hover:bg-purple-600 btn-circle "
        >
          <FaGoogle className="text-white"></FaGoogle>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
