"use client"

import { useEffect, useState } from "react";

import { Box, Grid, Typography } from "@mui/material";

import WeatherCard from "./WeatherCard";
import WeatherGraph from "./WeatherGraph";

import { useWeatherSocket } from "../_hooks/useWeatherSocket";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  currentTime: string;
  icon: string;
}

const WeatherContainer: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [temperatureHistory, setTemperatureHistory] = useState<number[]>([]);
  const [windSpeedHistory, setWindSpeedHistory] = useState<number[]>([]);
  const [humidityHistory, setHumidityHistory] = useState<number[]>([]);
  const [timeHistory, setTimeHistory] = useState<string[]>([]);
  const weatherDataResponse = useWeatherSocket();


  useEffect(() => {
    if (!weatherDataResponse) return;

    setWeatherData(weatherDataResponse);
    setTemperatureHistory((prev) => [...prev, weatherDataResponse.temperature]);
    setWindSpeedHistory((prev) => [...prev, weatherDataResponse.windSpeed]);
    setHumidityHistory((prev) => [...prev, weatherDataResponse.humidity]);
    const time = weatherDataResponse.currentTime.split(" at ")[1];
    setTimeHistory((prev) => [...prev, time]);
  }, [weatherDataResponse]);


  return (
    <Box sx={{ mt: 4, textAlign: "center", backgroundColor: "#f5f5f5", mb: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color={"darkblue"}
        gutterBottom
      >
        Live Weather Updates with Temperature Graph
      </Typography>
      {weatherData ? (
        <>
          <Grid
            container
            justifyContent="center"
            spacing={4}
            mt={2}
          >
            <Grid item xs={12} sm={8} md={6} lg={4}>
              {" "}
              <WeatherCard {...weatherData} />
            </Grid>
          </Grid>
          <Box mt={6} p={4}>
            <WeatherGraph
              timeHistory={timeHistory}
              temperatureHistory={temperatureHistory}
              windSpeedHistory={windSpeedHistory}
              humidityHistory={humidityHistory}
            />
          </Box>
        </>
      ) : (
        <Typography color={"darkblue"} variant="body1">
          Loading weather data...
        </Typography>
      )}
    </Box>
  );
};

export default WeatherContainer;
