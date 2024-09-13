import { Link } from "react-router-dom";

//components
import RegistrationForm from "@components/Forms/RegistrationForm";

export default function Registration() {
  return (
    <div className="flex flex-col items-center mt-24 gap-12">
      <Link to="/">
        <div className="cursor-pointer flex gap-4">
          <strong className="text-xl">Back to Records </strong>
          <img src="vinyl-record.png" className="w-6" alt="record icon" />
        </div>
      </Link>
      <RegistrationForm />
    </div>
  );
}
