"use client"

import { useEffect, useState } from "react";

import { Box, Grid, Typography } from "@mui/material";

import WeatherCard from "./WeatherCard";

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
  const weatherDataResponse = useWeatherSocket();

  useEffect(() => {
    if (!weatherDataResponse) return;

    setWeatherData(weatherDataResponse);
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
