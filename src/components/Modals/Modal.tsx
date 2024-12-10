import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/16/solid";

import { ReactNode } from "react";

type Props = {
  trigger: ReactNode;
  isOpen?: boolean;
  portalRef?: Element | null;
  isCentered?: boolean;
  width?: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children: JSX.Element | JSX.Element[] | React.ReactNode;
};

export default function Modal({
  trigger,
  isOpen,
  portalRef = null,
  isCentered = true,
  width,
  setIsOpen,
  title = "",
  children,
  ...props
}: Props) {
  return (
    <Dialog.Root {...props} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal container={portalRef}>
        <Dialog.Content
          aria-describedby={undefined}
          className={clsx(
            `fixed flex flex-col z-50 bg-absenceOfColor min-w-64 min-h-64 shadow-lg ${width}`,
            isCentered && "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          )}
        >
          <div className="flex justify-between border-x-2 border-b-2 border-gray-400 ">
            <Dialog.Title className="text-xl text-white p-2">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="w-16 h-10 flex items-center justify-center "
                aria-label="Close"
              >
                <XMarkIcon className="w-8" />
              </button>
            </Dialog.Close>
          </div>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
