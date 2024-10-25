import { Card, CardContent, Typography } from "@mui/material";

interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  currentTime: string;
  icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  description,
  humidity,
  windSpeed,
  currentTime,
  icon,
}) => {
  return (
    <Card
      elevation={4}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="h4" fontWeight="bold" color={"darkblue"}>
          {city}
        </Typography>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`} // Weather icon
          alt={description}
        />
        <Typography variant="h6" color={"darkblue"}>
          {temperature}°C
        </Typography>
        <Typography color={"darkblue"}>{description}</Typography>
        <Typography color={"darkblue"}>Humidity: {humidity}%</Typography>
        <Typography color={"darkblue"}>Wind Speed: {windSpeed} m/s</Typography>
        <Typography color={"darkblue"}>Current Time: {currentTime}</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
