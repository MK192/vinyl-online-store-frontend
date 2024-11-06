import { useState } from "react";

//component
import Button from "@components/Buttons/Button";
import { AddressBookForm } from "@components/Forms/AddressBookForm";

export default function AddAddress() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <div>
        {isFormOpen && (
          <AddressBookForm isEdit={false} setIsFormOpen={setIsFormOpen} />
        )}
      </div>

      <Button handleClick={() => setIsFormOpen(true)}>
        <p>Add Address</p>
      </Button>
    </div>
  );
}
