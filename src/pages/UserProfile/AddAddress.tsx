import { useState } from "react";

//component
import Button from "@components/Buttons/Button";
import { AddressBookForm } from "@components/Forms/AddressBookForm";

export default function AddAddress() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <div className="mb-5">
        {isFormOpen ? (
          <AddressBookForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <Button onClick={() => setIsFormOpen(true)}>
            <p>Add Address</p>
          </Button>
        )}
      </div>
    </div>
  );
}
