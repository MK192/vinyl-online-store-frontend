import { redirect } from "react-router-dom";

//request
import { isAuth } from "requests/userRequest";

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
export const preventSignedLoaderFunction = async () => {
  let auth = false;
  await isAuth().then((data) => (auth = data.authenticated));
  if (auth) {
    return redirect("/");
  }
  return null;
};
