import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//components
import Button from "./Buttons/Button";
import ProfileImage from "./ProfileImage";
import Modal from "./Modals/Modal";
import CloseModal from "./Modals/CloseModal";
import HeaderLinksContainer from "./HeaderLinksContainer";

//context
import { UserContextValue } from "@context/UserContex";

//request
import { logoutUser, isAuth, getUser } from "requests/userRequest";

export default function NavHeader() {
  const { logedUserData, setLogedUserData } = useContext(UserContextValue);
  const ref = useRef<HTMLDivElement | null>(null);
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
    <nav className="h-16 flex items-center fixed w-full justify-between p-6 gap-4 bg-absenceOfColor border-b-2 border-gray-700 z-50">
      <Link to="/">
        <img
          src="vinyl-record.png"
          className="w-9 justify-self-start"
          alt="vinyl record icon"
        />
      </Link>
      <HeaderLinksContainer />

      {logedUserData ? (
        <div className="relative flex gap-4 items-center text-lg">
          <div
            ref={ref}
            id="nav-header-modal"
            className="absolute top-16 right-72"
          ></div>
          <Modal
            portalRef={ref.current}
            isCentered={false}
            trigger={
              <Button variant="content">
                <div className="flex gap-4 items-center">
                  <p>{formatedName}</p>
                  <ProfileImage imageURL={imageURL} />
                </div>
              </Button>
            }
          >
            <div className="flex flex-col gap-4 p-2 text-lg  mt-6 w-[300px]">
              <CloseModal>
                <Link to="/user-profile">Profile</Link>
              </CloseModal>
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
          </Modal>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to={"/registration"}>
            <strong className="cursor-pointer">Register</strong>
          </Link>
          <Link to={"/login"}>
            <strong className="cursor-pointer">Login</strong>
          </Link>
        </div>
      )}
    </nav>
  );
}
