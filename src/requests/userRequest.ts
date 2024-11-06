//utils
import { findFormChanges } from "utils/functions";

//type
import { RegistrationType, LoginType, EditAddressType } from "types/forms";
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

// Function for changing user password.
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

type AddUserProfileArgumentType = {
  formData: EditAddressType;
  id: string | undefined;
};
export const addUserAddress = async (data: AddUserProfileArgumentType) => {
  const {
    country,
    firstName,
    lastName,
    company,
    streetAddress,
    apartment,
    city,
    state,
    phone,
    postalCode,
    isDefault,
  } = data.formData;

  console.log(data.formData);
  try {
    const res = await fetch(`${baseUrl}/api/v1/user/addresses`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: country,
        firstName: firstName,
        lastName: lastName,
        company: company,
        streetAddress: streetAddress,
        apartment: apartment,
        city: city,
        state: state,
        postalCode: postalCode,
        phone: phone,
        isDefault: isDefault,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    console.log("address updated");
    const updatedProfile = await getUser();
    return updatedProfile;
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
export interface EditUserProfileArgumentType {
  currentProfile: LogedUserType | null;
  editedProfile: EditUserProfileType;
  imageFile: Blob[] | null;
  removeProfileImage: boolean;
}

export const editUserProfile = async ({
  currentProfile,
  editedProfile,
  imageFile,
  removeProfileImage,
}: EditUserProfileArgumentType) => {
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
      if (error instanceof Error) {
        console.error(error);
        throw new Error(`${error.message}`);
      }
    }
  }
};

type EditAddressArgumentType = { _id: string; formData: EditAddressType };
export const editUserAddress = async ({
  _id,
  formData,
}: EditAddressArgumentType) => {
  console.log(formData);
  try {
    const res = await fetch(`${baseUrl}/api/v1/user/addresses/${_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        apartment: formData.apartment,
        city: formData.city,
        country: formData.country,
        company: formData.company,
        firstName: formData.firstName,
        lastName: formData.lastName,
        isDefault: formData.isDefault,
        phone: formData.phone,
        postalCode: formData.postalCode,
        state: formData.state,
        streetAddress: formData.streetAddress,
      }),
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error);
    const updatedProfile = await getUser();
    return updatedProfile;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`${error.message}`);
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
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`${error.message}`);
    }
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

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`${error.message}`);
    }
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

export const deleteUserAddress = async (addressId: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/user/addresses/${addressId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    const updatedProfile = await getUser();
    return updatedProfile;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`${error.message}`);
    }
  }
};
