import * as Dialog from "@radix-ui/react-dialog";
type Props = {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
};
export default function CloseModal({ children }: Props) {
  return <Dialog.Close asChild>{children}</Dialog.Close>;
}
