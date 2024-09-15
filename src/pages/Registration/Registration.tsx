//components
import RegistrationForm from "@components/Forms/RegistrationForm";
import BackToHome from "@components/BackToHome";

export default function Registration() {
  return (
    <div className="flex flex-col items-center mt-24 gap-12">
      <BackToHome />
      <RegistrationForm />
    </div>
  );
}
