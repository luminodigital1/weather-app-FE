import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  currentTime: string;
  icon: string;
}

export const useWeatherSocket = (): WeatherData | null => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const socket: Socket = io(SOCKET_SERVER_URL);

    socket.on("weatherUpdate", (data: WeatherData) => {
      console.log("data", data);
      setWeatherData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return weatherData;
};
