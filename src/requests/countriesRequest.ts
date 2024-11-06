const baseUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:3001";

// GET

export const getCountries = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/countries`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data.countries;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`${error.message}`);
    }
  }
};

export const getStates = async (country: string) => {
  console.log(country);
  try {
    const res = await fetch(`${baseUrl}/api/v1/countries/${country}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data.states;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`${error.message}`);
    }
  }
};
