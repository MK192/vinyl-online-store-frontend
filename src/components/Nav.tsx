import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="h-14 flex items-center p-6 justify-end gap-4 bg-jollyChristmas">
      <img src="vinyl-record.png" className="w-9 " alt="vinyl record" />
      <Link to={"/registration"}>
        <strong className="cursor-pointer">Register</strong>
      </Link>
      <Link to={"/login"}>
        <strong className="cursor-pointer">Login</strong>
      </Link>
      <img
        src="blank-user.png "
        className="w-7 border-[1px] border-blackHowl rounded-full bg-slate-50 cursor-pointer"
        alt="generic user image"
      />
    </nav>
  );
}
