import { ReactNode, useContext } from "react";

//component
import Button from "./Button";

//context
import { UserContextValue } from "@context/UserContex";

//requests
import { logoutUser } from "requests/userRequest";

type Props = {
  backgroundColor?: string;
  type?: "submit" | "reset" | "button";
  fullWidth?: boolean;
  handleClick?: () => void;
  variant?: "small" | "medium" | "large";
  children: ReactNode;
};

export default function LogoutButton({
  backgroundColor = "absenceOfColor",
  fullWidth = false,
  type = "button",
  variant = "medium",
  children,
}: Props) {
  // const { setLogedUserData } = useContext(UserContextValue);

  return (
    <Button
      backgroundColor={backgroundColor}
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      onClick={() => {
        logoutUser();
        // setLogedUserData(null);
      }}
    >
      {children}
    </Button>
  );
}
