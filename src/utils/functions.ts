//type
import { LogedUserType, EditUserProfileType } from "types/user";

//function that check if some form field is edited, if not to prevent sending request
export const findFormChanges = (currentProfile: any, editedProfile: any) => {
  let changes = false;
  Object.entries(editedProfile).forEach(([key]) => {
    if (currentProfile[key] !== editedProfile[key]) {
      changes = true;
    }
  });

  return changes;
};
