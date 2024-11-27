import { ReactNode, useState } from "react";

//components
import Modal from "./Modal";

export default function ModalDialog({ trigger, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span onClick={() => setIsOpen(!isOpen)}>{trigger}</span>
      {isOpen ? (
        <Modal {...props} onClose={() => setIsOpen(false)}>
          {props.children}
        </Modal>
      ) : null}
    </>
  );
}
