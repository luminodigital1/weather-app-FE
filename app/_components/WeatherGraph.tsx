import { useRef } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherGraphProps {
  timeHistory: string[];
  temperatureHistory: number[];
  windSpeedHistory: number[];
  humidityHistory: number[];
}

const WeatherGraph: React.FC<WeatherGraphProps> = ({
  timeHistory,
  temperatureHistory,
  windSpeedHistory,
  humidityHistory,
}) => {
  const chartRef = useRef(null);

  const data = {
    labels: timeHistory,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatureHistory,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
      {
        label: "Wind Speed (m/s)",
        data: windSpeedHistory,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "rgba(255, 159, 64, 1)",
        tension: 0.4,
      },
      {
        label: "Humidity (%)",
        data: humidityHistory,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "rgba(153, 102, 255, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Time",
          color: "#4a4a4a",
          font: {
            weight: 700,
            size: 14,
          },
        },
        ticks: {
          color: "#4a4a4a",
          font: {
            weight: 700,
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.5)",
          lineWidth: 1,
        },
        title: {
          display: true,
          text: "Values",
          color: "#4a4a4a",
          font: {
            weight: 700,
            size: 14,
          },
        },
        ticks: {
          color: "#4a4a4a",
          font: {
            weight: 700,
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#4a4a4a",
          font: {
            weight: 700,
          },
        },
      },
      title: {
        display: true,
        text: "Live Weather Data",
        color: "#4a4a4a",
        font: {
          weight: 800,
          size: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: {
          size: 14,
          weight: 700,
        },
        bodyFont: {
          size: 12,
          weight: 700,
        },
        footerFont: {
          size: 10,
          style: "italic" as const,
        },
      },
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default WeatherGraph;
