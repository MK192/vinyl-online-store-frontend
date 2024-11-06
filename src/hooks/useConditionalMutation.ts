import { useMutation } from "@tanstack/react-query";
import { addUserAddress, editUserAddress } from "requests/userRequest";

const useConditionalMutation = (isEdit: boolean, addressId: string) => {
  return useMutation((data) => {
    return isEdit ? editUserAddress(addressId, data) : addUserAddress(data);
  });
};

export default useConditionalMutation;
