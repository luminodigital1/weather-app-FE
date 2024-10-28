
# Weather Application Frontend

## Overview

The Weather Application Frontend is built using Next.js and provides a user interface for a weather application that interacts with the Weather Application Backend. This frontend connects to the backend via Socket.IO to receive real-time weather updates. By default, it displays weather data, time, and a line graph for New York City, with a dropdown to select other cities for which the weather data can be retrieved.

### Key Features:
- **Real-time Weather Updates**: Connects to the backend to receive live weather updates for the selected city.
- **City Selection**: A dropdown menu allows users to select a city, fetching the corresponding weather data and graph.
- **Data Visualization**: Displays weather data in a visually appealing manner using charts.

## Getting Started

To run the application locally, follow these steps:

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/en/download/) installed on your machine (version 14.x or later).

### Clone the Repository
```bash
git clone https://github.com/luminodigital1/weather-app-FE.git
cd weather-app-FE
```

### Install Dependencies
Run the following command to install the required dependencies:
```bash
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root of the project and add the following environment variables:
```env
NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:3000
```

### Running the Application
To start the application in development mode, run:
```bash
npm run dev
```

The server will start and listen on `http://localhost:3005`.

## Live Testing

You can test the live application at the following URL: [weather-app-fe-ten.vercel.app](https://weather-app-fe-ten.vercel.app)

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)