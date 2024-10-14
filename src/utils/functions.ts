import { redirect } from "react-router-dom";

//request
import { isAuth } from "requests/userRequest";

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

/*loader function, prevent user who is not signed
to access protected routes*/

export const protectedLoaderFunction = async () => {
  let auth = false;
  await isAuth().then((data) => (auth = data.authenticated));
  if (!auth) {
    return redirect("/");
  }
  return null;
};

/*loader function, prevent signed user to access registration or
login route*/
export const signedLoaderFunction = async () => {
  let auth = false;
  await isAuth().then((data) => (auth = data.authenticated));
  if (auth) {
    return redirect("/");
  }
  return null;
};
