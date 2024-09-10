export default function Nav() {
  return (
    <nav className="h-14 flex items-center p-6 justify-end gap-4 bg-JollyChristmas">
      <img src="vinyl-record.png" className="w-9 " alt="vinyl record" />
      <strong className="cursor-pointer">Register</strong>
      <strong className="cursor-pointer">Login</strong>
      <img
        src="blank-user.png "
        className="w-7 border-[1px] border-blackHowl rounded-full bg-slate-50 cursor-pointer"
        alt="generic user image"
      />
    </nav>
  );
}
