import { useEffect, useState } from "react";

//components
import UserProfileNav from "./UserProfileNav";
import ProfileOptions from "./ProfileOptions";
import Hamburger from "@components/Hamburger";
import Modal from "@components/Modals/Modal";
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
        <UserProfileNav setActivePage={setActivePage} />
        {/*Hamburger is used to activate navigation modal on smaller screens*/}
        <nav className="self-start md:hidden">
          <Hamburger
            handleClick={() => {
              setShowModal(!showModal);
            }}
          />
        </nav>
        <div id="modal" className="absolute top-1 left-1"></div>
        {showModal && (
          <Modal
            isOpen={showModal}
            width="w-10/12"
            title="Profile Navigation"
            onClose={() => setShowModal(false)}
            domNode={document.getElementById("modal")}
          >
            <UserProfileNavResponsive
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </Modal>
        )}
        <ProfileOptions selectedOption={activePage} />
      </div>
    </>
  );
}
