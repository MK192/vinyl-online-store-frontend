import { useEffect, useState } from "react";

//components
import UserProfileNav from "./UserProfileNav";
import ProfileOptions from "./ProfileOptions";
import Hamburger from "@components/Hamburger";
import ModalDialog from "@components/Modals/ModalDialog";
import UserProfileNavResponsive from "./UserProfileNavResponsive";

//enums
import { EProfile_Page_Options } from "enums/enums";

export default function UserProfileContent() {
  const [activePage, setActivePage] = useState(
    EProfile_Page_Options.ORDER_HISTORY
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      setShowModal(false);
    }
  }, [activePage]);

  return (
    <>
      <div className="flex flex-col relative items-center gap-12 px-6 pt-12 md:px-8 md:items-start md:flex-row ">
        {/*UserProfileNav component is used for user profile navigation on 
       wider screens larger 800 px and larger */}
        <UserProfileNav setActivePage={setActivePage} />
        <div id="modal" className="absolute top-1 left-1 md:hidden"></div>

        {/*for screens with width below 800 px modal is used for
       profile user profile navigation. Modal is open when hamburger
       is clicked*/}
        <nav className="self-start md:hidden">
          <ModalDialog
            trigger={
              <button>
                <Hamburger />
              </button>
            }
            width="w-10/12"
            title="Profile Navigation"
            domNode={document.getElementById("modal")}
          >
            <UserProfileNavResponsive
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </ModalDialog>
        </nav>

        <ProfileOptions selectedOption={activePage} />
      </div>
    </>
  );
}
