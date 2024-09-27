import { useState } from "react";
import { Link } from "react-router-dom";

//components
import Button from "@components/Buttons/Button";
import LogoutButton from "@components/Buttons/LogoutButton";
import ProfileOption from "./ProfileOption";
import HamburgerNav from "./HamburgerNav";

export default function UserProfileNav() {
  const [activePage, setActivePage] = useState("order-history");

  return (
    <>
      <nav className="flex flex-col md:flex-row items-start">
        <div className="hidden md:flex justify-center mt-44 w-3/12 text-left h-screen p-6">
          <ul className="flex flex-col gap-3 w-52">
            <li>
              <Button
                handleClick={() => setActivePage("order-history")}
                fullWidth
              >
                <p className="font-semibold text-xl cursor-pointer">
                  Order History
                </p>
              </Button>
            </li>
            <li>
              <Button
                handleClick={() => setActivePage("address-book")}
                fullWidth
              >
                <p className="font-semibold text-xl cursor-pointer">
                  Address Book
                </p>
              </Button>
            </li>
            <li onClick={() => setActivePage("profile")}>
              <Button
                handleClick={() => setActivePage("order-history")}
                fullWidth
              >
                <p className="font-semibold text-xl cursor-pointer">Profile</p>
              </Button>
            </li>
            <li>
              <Link to="/">
                <LogoutButton fullWidth>
                  <p className="font-semibold text-xl cursor-pointer">
                    Log Out
                  </p>
                </LogoutButton>
              </Link>
            </li>
          </ul>
        </div>

        {/*Hamburger is used for navigation on smaller screens*/}
        <HamburgerNav />
        <ProfileOption selectedOption={activePage} />
      </nav>
    </>
  );
}
