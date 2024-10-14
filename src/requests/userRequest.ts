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

/* 
Function for edit users profile. 
UseMutation only can provide 1 argument, that is reason why
params are transfered from one source.

 @params:
 1) currentProfile - whole user object fetched when user is loged in,
 2) editedProfile - new data gathered from edit profile form,
 3) fileImage - image file that should be used to update users
 profile image,
 4) removeProfileImage - boolean that should signal if profile image
 should be removed. 
 */

type EditUserType = {
  currentProfile: LogedUserType | null;
  editedProfile: EditUserProfileType;
  imageFile: Blob[] | null;
  removeProfileImage: boolean;
};
export const editUserProfile = async ({
  currentProfile,
  editedProfile,
  imageFile,
  removeProfileImage,
}: EditUserType) => {
  const isFormEdited = findFormChanges(currentProfile, editedProfile);
  const formData = new FormData();

  if (imageFile) {
    formData.append("profileImage", imageFile[0]);
  }
  if (removeProfileImage && !currentProfile?.profileImage) return;

  if (removeProfileImage) deleteProfileImage();

  if (isFormEdited || imageFile || removeProfileImage) {
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

export const isAuth = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/check-auth`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

/////DELETE

export const deleteProfileImage = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/user/delete-profile-image`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`${error.message}`);
    }
  }
};
