//type
import { RegistrationType, LoginType } from "types/forms";
import { EditUserProfileType, LogedUserType } from "types/user";

const baseUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:3001";

/////// POST

// Function for registration
export const registerUser = async (formData: RegistrationType) => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

// Function for log in
export const loginUser = async (formData: LoginType) => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error);
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

// Function for logout
export const logoutUser = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    console.log(data);
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

////// PATCH

export const editUserProfile = async (
  profile: LogedUserType[] | EditUserProfileType[]
) => {
  const currentProfile = profile[0];
  const editedProfile = profile[1];
  const fileImage = profile[2];

  const formData = new FormData();
  formData.append("firstName", editedProfile.firstName);
  formData.append("lastName", editedProfile.lastName);
  formData.append("birthday", editedProfile.birthday);
  if (fileImage) {
    formData.append("profileImage", fileImage[0]);
  }
  try {
    const res = await fetch(`${baseUrl}/api/v1/user`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error);
    console.log("form complete");
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
////// GET

export const getUser = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
