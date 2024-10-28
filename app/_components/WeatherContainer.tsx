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

interface WeatherHistory {
  temperatureHistory: number[];
  windSpeedHistory: number[];
  humidityHistory: number[];
  timeHistory: string[];
}

const WeatherContainer: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherHistory, setWeatherHistory] = useState<WeatherHistory>({
    temperatureHistory: [],
    windSpeedHistory: [],
    humidityHistory: [],
    timeHistory: [],
  });
  const [city, setCity] = useState<Cities>(Cities.NewYork);
  const weatherDataResponse = useWeatherSocket();

  useEffect(() => {
    initializeWeatherData();
  }, [city]);

  useEffect(() => {
    if (weatherDataResponse) updateWeatherHistory(weatherDataResponse);
  }, [weatherDataResponse]);

  const initializeWeatherData = async () => {
    if (city) {
      setWeatherData(null);
      const res = await fetchData(city);
      setWeatherData(res);
      resetWeatherHistory();
    }
  };

  const resetWeatherHistory = () => {
    setWeatherHistory({
      temperatureHistory: [],
      windSpeedHistory: [],
      humidityHistory: [],
      timeHistory: [],
    });
  };

  const updateWeatherHistory = (data: WeatherData) => {
    const time = data.currentTime.split(" at ")[1];
    setWeatherData(data);
    setWeatherHistory((prev) => ({
      temperatureHistory: [...prev.temperatureHistory, data.temperature],
      windSpeedHistory: [...prev.windSpeedHistory, data.windSpeed],
      humidityHistory: [...prev.humidityHistory, data.humidity],
      timeHistory: [...prev.timeHistory, time],
    }));
  };

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setCity(event.target.value as Cities);
  };

  return (
    <Box sx={{ mt: 4, textAlign: "center", backgroundColor: "#f5f5f5", mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" color={"darkblue"} gutterBottom>
        Live Weather Updates with Temperature Graph
      </Typography>
      <CitySelector city={city} onCityChange={handleCityChange} />
      {weatherData ? (
        <>
          <Grid container justifyContent="center" spacing={4} mt={2}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <WeatherCard {...weatherData} />
            </Grid>
          </Grid>
          <Box mt={6} p={4}>
            <WeatherGraph {...weatherHistory} />
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
