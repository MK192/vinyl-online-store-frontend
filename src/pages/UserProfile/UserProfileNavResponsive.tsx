import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

//component
import Button from "@components/Buttons/Button";
import LogoutButton from "@components/Buttons/LogoutButton";
import CloseModal from "@components/Modals/CloseModal";

//enums
import { EProfile_Page_Options } from "enums/enums";

type Props = {
  setActivePage: Dispatch<SetStateAction<string>>;
  activePage: string;
};

export default function UserProfileNavResponsive({
  setActivePage,
  activePage,
}: Props) {
  return (
    <div className="p-4 mt-2 h-[70vh] w-full flex flex-col justify-start items-center">
      <p className="text-xl text-gray-300 self-end uppercase border-b border-absenceOfColor">
        {activePage}
      </p>
      <ul className="flex flex-col gap-4 w-9/12 mt-9 sm:w-6/12">
        <li>
          <CloseModal>
            <Button
              onClick={() => {
                setActivePage(EProfile_Page_Options.ORDER_HISTORY);
              }}
              fullWidth
            >
              <p className="font-semibold text-xl cursor-pointer">
                Order History
              </p>
            </Button>
          </CloseModal>
        </li>
        <li>
          <CloseModal>
            <Button
              onClick={() => {
                setActivePage(EProfile_Page_Options.ADDRESS_BOOK);
              }}
              fullWidth
            >
              <p className="font-semibold text-xl cursor-pointer">
                Address Book
              </p>
            </Button>
          </CloseModal>
        </li>
        <li>
          <CloseModal>
            <Button
              onClick={() => {
                setActivePage(EProfile_Page_Options.EDIT_PROFILE);
              }}
              fullWidth
            >
              <p className="font-semibold text-xl cursor-pointer">
                Edit Profile
              </p>
            </Button>
          </CloseModal>
        </li>
        <li>
          <Link to="/">
            <LogoutButton fullWidth>
              <p className="font-semibold text-xl cursor-pointer">Log Out</p>
            </LogoutButton>
          </Link>
        </li>
      </ul>
    </div>
  );
}
