import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//components
import ProfileImage from "./ProfileImage";
import ModalDialog from "./Modals/ModalDialog";
import Modal from "./Modals/Modal";
import Button from "./Buttons/Button";

//context
import { UserContextValue } from "@context/UserContex";

//request
import { logoutUser, isAuth, getUser } from "requests/userRequest";

export default function Nav() {
  const { logedUserData, setLogedUserData } = useContext(UserContextValue);
  const formatedName = `${logedUserData?.firstName} ${logedUserData?.lastName}`;
  const imageURL = logedUserData?.profileImage
    ? `${import.meta.env.VITE_BASE_URL}${logedUserData?.profileImage}`
    : null;

  useEffect(() => {
    const isUserLoged = async () => {
      await isAuth()
        .then((data) => {
          if (data.authenticated) {
            return getUser();
          }
        })
        .then((res) => setLogedUserData(res));
    };
    isUserLoged();
  }, [setLogedUserData]);

  return (
    <nav className="h-16 flex items-center justify-between p-6 gap-4 bg-absenceOfColor border-b-2 border-gray-700">
      <Link to="/">
        <img
          src="vinyl-record.png"
          className="w-9 justify-self-start"
          alt="vinyl record icon"
        />
      </Link>
      {logedUserData ? (
        <div className="relative flex gap-4 items-center text-lg">
          <p>{formatedName}</p>
          <div id="nav-modal" className="absolute top-14 right-72"></div>
          <ModalDialog
            trigger={
              <Button variant="content">
                <ProfileImage imageURL={imageURL} />
              </Button>
            }
            domNode={document.getElementById("nav-modal")}
          >
            <div className="flex flex-col gap-2 p-2 text-lg">
              <Link to="/user-profile">Profile</Link>
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
            </div>
          </ModalDialog>
        </div>
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
