//utils
import { findFormChanges } from "utils/functions";

//type
import { RegistrationType, LoginType } from "types/forms";
import { LogedUserType } from "types/user";
import { EditUserProfileType } from "types/forms";

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

export const changePassword = async (passwords: string[]) => {
  const currentPassword = passwords[0];
  const newPassword = passwords[1];
  try {
    const res = await fetch(`${baseUrl}/api/v1/user/change-password`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(data.error);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`${error.message}`);
    }
  }
};

////// PATCH
export const editUserProfile = async (
  profile: (LogedUserType | EditUserProfileType | Blob[])[]
) => {
  const currentProfile = profile[0] as LogedUserType;
  const editedProfile = profile[1] as EditUserProfileType;
  const fileImage = profile[2] as Blob[];
  const isFormEdited = findFormChanges(currentProfile, editedProfile);
  const formData = new FormData();
  if (fileImage) {
    formData.append("profileImage", fileImage[0]);
  }

  if (isFormEdited || fileImage) {
    formData.append("firstName", editedProfile.firstName);
    formData.append("lastName", editedProfile.lastName);
    formData.append("birthday", editedProfile.birthday);

    try {
      const res = await fetch(`${baseUrl}/api/v1/user`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      console.log("form complete");
      const updatedProfile = await getUser();

      return updatedProfile;
    } catch (error) {
      console.error(error);
      throw new Error(`${error}`);
    }
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

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
