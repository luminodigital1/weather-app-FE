import axios from "axios";

export const fetchData = async (city: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/weather/${city}`
    );
    console.log("Weather data fetched via API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data via API:", error);
    return null;
  }
};
