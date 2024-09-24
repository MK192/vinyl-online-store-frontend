//components
import Button from "@components/Buttons/Button";
import FormInputText from "./FormInputText";

export default function ChangePasswordForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="w-8/12 flex flex-col gap-6">
        <FormInputText labelText="Current Password" />
        <FormInputText labelText="New Password" />
      </div>
      <div>
        <Button type="submit">
          <p>Apply Changes</p>
        </Button>
      </div>
    </form>
  );
}
