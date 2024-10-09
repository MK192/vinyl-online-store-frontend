import { Link } from "react-router-dom";

export default function BackToHome() {
  return (
    <Link to={"/"}>
      <div className="cursor-pointer flex gap-4">
        <strong className="text-xl">Back to Home Page </strong>
        <img src="vinyl-record.png" className="w-6" alt="record icon" />
      </div>
    </Link>
  );
}
