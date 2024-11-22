//components
import BackToHome from "@components/BackToHome";

export default function OrderHistory() {
  return (
    <div className="md:w-9/12  md:p-12">
      <div className="flex flex-col gap-4 items-start">
        <h1 className="text-gray-300 text-3xl font-semibold">Order history</h1>
        <p>You haven't placed any orders yet!</p>
        <BackToHome />
      </div>
    </div>
  );
}
