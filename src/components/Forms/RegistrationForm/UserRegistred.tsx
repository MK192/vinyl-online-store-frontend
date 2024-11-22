import { Link } from "react-router-dom";

export default function UserRegistered() {
  return (
    <div className="flex flex-col mt-9 gap-6">
      <p className="text-2xl mx-auto">Successful Registration</p>
      <Link to="/login">
        <p className="text-xl underline text-gray-500 text-nowrap">
          Go To Login Page
        </p>
      </Link>
    </div>
  );
}
