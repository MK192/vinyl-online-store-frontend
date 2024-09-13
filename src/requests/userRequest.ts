//type
import { RegistrationType } from "types/forms";

export const registerUser = async (formData: RegistrationType) => {
  const baseUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:3001";

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
