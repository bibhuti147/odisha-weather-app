import React, { useEffect, useState } from "react";
import { CiCloudMoon } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { TiWeatherSunny } from "react-icons/ti";
import ReactGA from "react-ga4";

const api = {
  key: "01e5a041d3b78a9358f93fac088d5b36",
  base: "http://api.openweathermap.org/",
};

const Weatherwidget = () => {
  const [location, setLocation] = useState("bhubaneswar");
  const [lat, setLat] = useState("20.2961");
  const [lon, setLon] = useState("85.8245");
  const [weather, setWeather] = useState({});
  const [dailyTemps, setDailyTemps] = useState({});

  const searchpressed = async () => {
    const res1 = await fetch(
      `${api.base}geo/1.0/direct?q=${location}&limit=1&appid=${api.key}`
    );
    const result1 = await res1.json();
    const newLat = result1[0].lat;
    const newLon = result1[0].lon;
    setLat(newLat);
    setLon(newLon);

    const res2 = await fetch(
      `${api.base}data/2.5/forecast?lat=${newLat}&lon=${newLon}&units=metric&appid=${api.key}`
    );
    const result2 = await res2.json();
    if (res2.status === 200) {
      setWeather(result2);
      processWeatherData(result2.list);
    }

    ReactGA.event({
      category: "Weatherwidget SearchButton",
      action: "Weatherwidget SearchButton Clicked",
    });
  };

  const processWeatherData = (weatherList) => {
    const newDailyTemps = {};

    weatherList.forEach((dataPoint) => {
      const date = new Date(dataPoint.dt * 1000).getDate();
      const today = new Date().getDate();
      if (date === today) {
        return;
      }

      if (!newDailyTemps[date]) {
        newDailyTemps[date] = {
          tempMin: null,
          tempMax: null,
        };
      }

      if (
        dataPoint.main.temp_min < newDailyTemps[date].tempMin ||
        newDailyTemps[date].tempMin === null
      ) {
        newDailyTemps[date].tempMin = dataPoint.main.temp_min;
      }
      if (
        dataPoint.main.temp_max > newDailyTemps[date].tempMax ||
        newDailyTemps[date].tempMax === null
      ) {
        newDailyTemps[date].tempMax = dataPoint.main.temp_max;
      }
    });

    setDailyTemps(newDailyTemps);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      searchpressed();
    }
  };

  const handleButtonClick = () => {
    searchpressed();
  };

  function SVGIcon() {
    const hours = new Date().getHours();
    const sunIcon = <IoSunnyOutline size={45} className="text-yellow-400" />;
    const moonIcon = <CiCloudMoon size={45} />;
    return hours >= 6 && hours < 18 ? sunIcon : moonIcon;
  }

  useEffect(() => {
    searchpressed();
  }, []);

  return (
    <div className="md:px-8 sm:px-5 relative">
      <h1 className="mb-4 text-xl font-bold text-black">Weather</h1>
      <input
        type="text"
        placeholder="Enter the City"
        className="mb-4 rounded-md w-4/5 md:w-5/6 ring-1 ring-black ring-opacity-50"
        onChange={(e) => setLocation(e.target.value)}
        onKeyPress={handleSearch}
      />
      <button
        onClick={handleButtonClick}
        className="absolute bg-white p-1 py-2 focus:outline-none text-base ring-2 ring-black ring-opacity-50 text-gray-600 font-medium rounded-md ml-1"
      >
        Search
      </button>
      {weather.list && (
        <div
          className="flex flex-col items-center justify-center text-gray-700 p-2 mb-4 rounded-xl"
          style={{ backgroundColor: "#49c5b6", color: "#000" }}
        >
          <div className="bg-white p-5 w-full rounded-xl">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <span className="flex text-4xl font-bold">
                    {Math.round(weather.list[0].main.temp)}°C
                  </span>
                  {SVGIcon()}
                </div>
                <span className="font-semibold mt-1 text-gray-500">
                  Feels like {Math.round(weather.list[0].main.feels_like)}°C
                </span>
                <span className="text-lg font-bold mt-1">
                  {weather.city.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-700 mt-1">
                  {weather.list[0].weather[0].description}
                </span>
                <br />
                <span className="font-semibold mt-1 text-gray-500">
                  Precip: {Math.round(weather.list[0].pop * 100)}%
                </span>
                <br />
                <span className="font-semibold mt-1 text-gray-500">
                  Humidity: {Math.round(weather.list[0].main.humidity)}%
                </span>
                <br />
                <span className="font-semibold mt-1 text-gray-500">
                  Wind: {Math.round(weather.list[0].wind.gust)}km/h
                </span>
                <br />
                <span className="font-semibold mt-1 text-gray-500 whitespace-nowrap">
                  Rain Vol.:{" "}
                  {typeof weather.list[0].rain === "undefined"
                    ? 0
                    : weather.list[0].rain["3h"]}
                  mm
                </span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              {weather.list.slice(0, 5).map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="font-semibold text-base">
                    {Math.round(item.main.temp)}°C
                  </span>
                  <span className="font-semibold mt-1 text-xs">
                    {new Date(item.dt * 1000).getHours() > 12
                      ? new Date(item.dt * 1000).getHours() - 12 + " PM"
                      : new Date(item.dt * 1000).getHours() + " AM"}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-row mt-6 justify-between w-full gap-2">
              {[8, 16, 24, 32].map((index) => (
                <div
                  key={index}
                  className="flex flex-col w-1/4 bg-white rounded-xl ring-2 ring-black ring-opacity-50 pb-4"
                >
                  <div className="text-center pt-2 mb-2">
                    <TiWeatherSunny size={40} className="w-10 mx-auto" />
                  </div>
                  <div className="text-center">
                    <b className="font-normal">
                      {new Date(weather.list[index].dt * 1000).toLocaleString(
                        "default",
                        { weekday: "short" }
                      )}
                    </b>
                    <br />
                    <strong className="font-bold text-xs">
                      {Math.floor(
                        dailyTemps[
                          ((new Date().getDate() + index / 8 - 1) % 30) + 1
                        ]?.tempMin
                      )}
                      °C/
                      {Math.ceil(
                        dailyTemps[
                          ((new Date().getDate() + index / 8 - 1) % 30) + 1
                        ]?.tempMax
                      )}
                      °C
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weatherwidget;
