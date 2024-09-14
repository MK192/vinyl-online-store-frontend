import { Link } from "react-router-dom";

//components
import RegistrationForm from "@components/Forms/RegistrationForm";
import BackToHome from "@components/BackToRecords";

export default function Registration() {
  return (
    <div className="flex flex-col items-center mt-24 gap-12">
      <Link to="/">
        <BackToHome />
      </Link>
      <RegistrationForm />
    </div>
  );
}
