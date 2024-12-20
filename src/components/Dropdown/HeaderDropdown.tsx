import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  trigger: ReactNode;
  children: ReactNode;
};

export default function HeaderDropdown({ trigger, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const checkOutsideClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
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

  return (
    <div>
      <span onClick={() => setIsOpen(true)}>{trigger}</span>

      {isOpen ? (
        <div
          className="min-h-48 w-9/12 left-1/2 -translate-x-1/2 fixed top-20 p-8 bg-absenceOfColor rounded-sm"
          ref={ref}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
