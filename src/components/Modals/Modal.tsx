import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  title?: string;
  width?: string;
  height?: string;
  onClose: (showModal: boolean) => void;
  domNode?: HTMLElement | Element | DocumentFragment | null;
};
const Modal = ({
  children,
  title,
  width,
  height,
  onClose,
  domNode = document.body,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const checkOutsideClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", checkOutsideClick);
    return () => {
      document.removeEventListener("mousedown", checkOutsideClick);
    };
  }, []);

  return createPortal(
    <div
      className={`max-w-[500px] min-w-72 ${width} ${height} fixed z-10 bg-gradient-to-r from-gray-700 to-slate-800 rounded-sm `}
      ref={ref}
    >
      <div className="flex justify-between">
        <strong className="p-2 text-xl text-gray-300">{title}</strong>
        <button
          className="bg-absenceOfColor w-16 h-8 "
          onClick={() => onClose(false)}
        >
          <p className="text-gray-300 text-xl"> x</p>
        </button>
      </div>
      <hr className="m-4 border-absenceOfColor border-[1px]" />
      <div>{children}</div>
    </div>,
    domNode ? domNode : document.body
  );
};

export default Modal;
