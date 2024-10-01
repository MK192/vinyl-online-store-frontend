import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  title: string;
  setShowModal: (showModal: boolean) => void;
  domNode?: HTMLElement | Element | DocumentFragment | null;
};
const Modal = ({
  children,
  title,
  setShowModal,
  domNode = document.body,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const checkOutsideClick = (event: MouseEvent) => {
    if (ref.current === event.target) {
      setShowModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", checkOutsideClick);
    return () => {
      document.removeEventListener("click", checkOutsideClick);
    };
  }, []);

  return createPortal(
    <div
      className="flex items-center justify-center fixed z-50 top-0 bottom-0 left-0 right-0 "
      ref={ref}
    >
      <div className="w-36 p-6 overflow-hidden fixed left-0 bottom-0 z-index-30 bg-red-600">
        <div className="title-and-close">
          <strong>{title}</strong>
          <button className="close-modal" onClick={() => setShowModal(false)}>
            x
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,

    domNode ? domNode : document.body
  );
};

export default Modal;
