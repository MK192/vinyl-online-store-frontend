import { Link } from "react-router-dom";

//components
import Button from "@components/Buttons/Button";
import LogoutButton from "@components/Buttons/LogoutButton";

type Props = {
  setActivePage: (activePage: string) => void;
};
export default function UserProfileNav({ setActivePage }: Props) {
  return (
    <nav className="hidden justify-center mt-44 w-4/12 md:flex lg:w-3/12 ">
      <ul className="flex flex-col gap-3 w-52">
        <li>
          <Button handleClick={() => setActivePage("order-history")} fullWidth>
            <p className="font-semibold text-xl cursor-pointer">
              Order History
            </p>
          </Button>
        </li>
        <li>
          <Button handleClick={() => setActivePage("address-book")} fullWidth>
            <p className="font-semibold text-xl cursor-pointer">Address Book</p>
          </Button>
        </li>
        <li>
          <Button handleClick={() => setActivePage("profile")} fullWidth>
            <p className="font-semibold text-xl cursor-pointer">Profile</p>
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
