import { useEffect, useState } from "react";
import axios from "axios";
import cloudy from "../assets/images/cloudy.png";
import loading from "../assets/images/loading.gif";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import sunny from "../assets/images/sunny.png";
import { API_KEY } from "../apiKey";
import "./weatherApp.css";
import {
  IconDropletHalfFilled,
  IconMapPinFilled,
  IconSearch,
  IconWind,
} from "@tabler/icons-react";
import dayjs from "dayjs";

// {
//         "coord": {
//             "lon": 77.2311,
//             "lat": 28.6128
//         },
//         "weather": [
//             {
//                 "id": 701,
//                 "main": "Mist",
//                 "description": "mist",
//                 "icon": "50n"
//             }
//         ],
//         "base": "stations",
//         "main": {
//             "temp": 299.24,
//             "feels_like": 299.24,
//             "temp_min": 299.24,
//             "temp_max": 299.24,
//             "pressure": 1006,
//             "humidity": 78,
//             "sea_level": 1006,
//             "grnd_level": 981
//         },
//         "visibility": 4000,
//         "wind": {
//             "speed": 3.09,
//             "deg": 100
//         },
//         "clouds": {
//             "all": 70
//         },
//         "dt": 1727462182,
//         "sys": {
//             "type": 1,
//             "id": 9165,
//             "country": "IN",
//             "sunrise": 1727484147,
//             "sunset": 1727527250
//         },
//         "timezone": 19800,
//         "id": 1261481,
//         "name": "New Delhi",
//         "cod": 200
//     }

const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

const weatherImages = {
  Clear: sunny,
  Clouds: cloudy,
  Rain: rainy,
  Snow: snowy,
  Haze: cloudy,
  Mist: cloudy,
};

const backgroundImages = {
  Clear: "linear-gradient(to right, #f3b07c, #fcd283)",
  Clouds: "linear-gradient(to right, #57d6d4, #f71eec)",
  Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
  Snow: "linear-gradient(to right, #aff2ff, #fff)",
  Haze: "linear-gradient(to right, #57d6d4, #71eeec)",
  Mist: "linear-gradient(to right, #57d6d4, #71eeec)",
};

const WeatherApp = function () {
  const [city, setCity] = useState("New Delhi");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    setIsLoading(true);
    const response = await axios.get(API_URL, {
      params: { q: city, appid: API_KEY, units: "Metric" },
    });
    console.log("Response", response);
    if (response?.data) {
      setData(response.data);
    } else {
      setData({ notFound: "Not Found" });
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value.trim() !== 0) {
      setCity(value);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      fetchResult();
    }
  };

  const handleSearchIconClick = () => {
    fetchResult();
  };

  const weatherName = data?.weather?.[0]?.main;

  const backgroundImage = data?.weather
    ? backgroundImages[weatherName]
    : backgroundImages["Clear"];

  // const today = new Date();
  const date = dayjs().format("DD MMM YY");

  return (
    <div className="container" style={{ backgroundImage }}>
      <div
        className="weather-app"
        style={{
          backgroundImage: backgroundImage?.replace
            ? backgroundImage.replace("to right", "to top")
            : null,
        }}
      >
        {/* ...............Search-bar */}

        <div className="search">
          <div className="search-top">
            <IconMapPinFilled />
            <p>{city}</p>
          </div>
          <div className="search-bar">
            <input
              type="text"
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
              placeholder="Enter Location"
            />
            <IconSearch color="#333" onClick={handleSearchIconClick} />
          </div>
        </div>

        {isLoading ? (
          <img className="loader" src={loading} alt="loader" />
        ) : data.notFound ? (
          <p>Not Found</p>
        ) : (
          <>
            <div className="weather">
              <img src={weatherImages[weatherName ?? "Clear"]} />
              <div className="weather-type">
                {weatherName && <p>{weatherName}</p>}
              </div>
              <div className="weather-temp">
                {data?.main && <p>{Math.floor(data.main.temp)}º</p>}
              </div>
            </div>
            <div className="weather-date">
              <p>{date}</p>{" "}
            </div>
            <div className="weather-data">
              <div className="humidity">
                <h4>Humidity</h4>
                <IconDropletHalfFilled color="#fff" />
                {data?.main?.humidity && <p>{data.main.humidity} %</p>}
              </div>
              <div className="wind">
                <h4>Wind</h4>
                <IconWind color="#fff" />
                {data?.wind && <p>{data.wind.speed} km/h</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
