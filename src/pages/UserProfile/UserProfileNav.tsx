import { Link } from "react-router-dom";

//components
import Button from "@components/Buttons/Button";
import LogoutButton from "@components/Buttons/LogoutButton";

//enum
import { EProfile_Page_Options } from "enums/enums";

type Props = {
  setActivePage: (activePage: string) => void;
};
export default function UserProfileNav({ setActivePage }: Props) {
  return (
    <nav className="hidden justify-center mt-44 w-4/12 md:flex lg:w-3/12 ">
      <ul className="flex flex-col gap-3 w-52">
        <li>
          <Button
            handleClick={() =>
              setActivePage(EProfile_Page_Options.ORDER_HISTORY)
            }
            fullWidth
          >
            <p className="font-semibold text-xl cursor-pointer">
              Order History
            </p>
          </Button>
        </li>
        <li>
          <Button
            handleClick={() =>
              setActivePage(EProfile_Page_Options.ADDRESS_BOOK)
            }
            fullWidth
          >
            <p className="font-semibold text-xl cursor-pointer">Address Book</p>
          </Button>
        </li>
        <li>
          <Button
            handleClick={() =>
              setActivePage(EProfile_Page_Options.EDIT_PROFILE)
            }
            fullWidth
          >
            <p className="font-semibold text-xl cursor-pointer">Edit Profile</p>
          </Button>
        </li>
        <li>
          <Link to="/">
            <LogoutButton fullWidth>
              <p className="font-semibold text-xl cursor-pointer">Log Out</p>
            </LogoutButton>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
