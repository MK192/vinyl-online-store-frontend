import { useState, useRef, useEffect } from "react";

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
  const [portalRef, setPortalRef] = useState<Element | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      setPortalRef(ref.current);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col relative items-center gap-12 px-6 pt-12 md:px-8 md:items-start md:flex-row ">
        {/*UserProfileNav component is used for navigating user profile on 
       wider screens, 800px and wider */}
        <UserProfileNav setActivePage={setActivePage} />
        <div
          ref={ref}
          id="user-profile-modal"
          className="absolute top-1 left-1 md:hidden"
        ></div>

        {/*for screens with width below 800px modal is used for
       user profile navigation. Modal is open when hamburger
       is clicked*/}

        <nav className="self-start md:hidden">
          <Modal
            trigger={
              <button>
                <Hamburger />
              </button>
            }
            width="w-10/12"
            isCentered={false}
            title="Profile Navigation"
            portalRef={portalRef}
          >
            <UserProfileNavResponsive
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </Modal>
        </nav>
        <ProfileOptions selectedOption={activePage} />
      </div>
    </>
  );
}
