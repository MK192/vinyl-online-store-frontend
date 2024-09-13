import { Link } from "react-router-dom";

//components
import BackToHome from "@components/BackToRecords";
import LoginForm from "@components/Forms/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center mt-24 gap-12">
      <Link to={"/"}>
        <BackToHome />
      </Link>
      <LoginForm />
    </div>
  );
}
