"use client"

import { useEffect, useState } from "react";

import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";

import WeatherCard from "./WeatherCard";
import WeatherGraph from "./WeatherGraph";
import CitySelector from "./CitySelector";

import { useWeatherSocket } from "../_hooks/useWeatherSocket";

import { fetchData } from "../_api/fetchData/route";

import { Cities } from "../_utils/constants";

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
  const [city, setCity] = useState<Cities>(Cities.NewYork);
  const weatherDataResponse = useWeatherSocket();

  useEffect(() => {
    const fetchWeather = async () => {
      if (city) {
        setWeatherData(null);
        const res = await fetchData(city);
        setWeatherData(res);
        setTemperatureHistory([]);
        setWindSpeedHistory([]);
        setHumidityHistory([]);
        setTimeHistory([]);
      }
    };

    fetchWeather();
  }, [city]);

  useEffect(() => {
    if (!weatherDataResponse) return;

    setWeatherData(weatherDataResponse);
    setTemperatureHistory((prev) => [...prev, weatherDataResponse.temperature]);
    setWindSpeedHistory((prev) => [...prev, weatherDataResponse.windSpeed]);
    setHumidityHistory((prev) => [...prev, weatherDataResponse.humidity]);
    const time = weatherDataResponse.currentTime.split(" at ")[1];
    setTimeHistory((prev) => [...prev, time]);
  }, [weatherDataResponse]);

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setCity(event.target.value as Cities);
  };

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
      <CitySelector city={city} onCityChange={handleCityChange} />{" "}
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
