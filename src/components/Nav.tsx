import { useContext } from "react";
import { Link } from "react-router-dom";

//components
import ProfileImage from "./ProfileImage";

//context
import { UserContextValue } from "@context/UserContex";

//request
import { logoutUser } from "requests/userRequest";

export default function Nav() {
  const { logedUserData, setLogedUserData } = useContext(UserContextValue);
  const formatedName = `${logedUserData?.firstName} ${logedUserData?.lastName}`;

  return (
    <nav className="h-14 flex items-center p-6 justify-end gap-4 bg-absenceOfColor border-b-2 border-gray-700">
      <img src="vinyl-record.png" className="w-9 " alt="vinyl record" />
      {logedUserData ? (
        <>
          <p>{formatedName}</p>

          <ProfileImage imageURL={logedUserData?.profileImage} />
          <Link to="/">
            <p
              onClick={() => {
                logoutUser();
                setLogedUserData(null);
              }}
            >
              Logout
            </p>
          </Link>
        </>
      ) : (
        <>
          <Link to={"/registration"}>
            <strong className="cursor-pointer">Register</strong>
          </Link>
          <Link to={"/login"}>
            <strong className="cursor-pointer">Login</strong>
          </Link>
        </>
      )}
    </nav>
  );
}
