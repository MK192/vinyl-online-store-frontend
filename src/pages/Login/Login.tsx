//components
import BackToHome from "@components/BackToHome";
import LoginForm from "@components/Forms/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center mt-24 gap-12">
      <BackToHome />
      <LoginForm />
    </div>
  );
}
