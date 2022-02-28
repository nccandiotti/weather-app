import React, { useState, useEffect } from "react"
import "./App.css"

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
}

const celsiusToFahrenheit = (celsius) => Math.trunc((celsius * 9) / 5 + 32)

//------------------------------------------

function App() {
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})
  const [isFar, setIsFar] = useState(false)

  const farToCelsToggle = () => {
    setIsFar((prevState) => !prevState)
  }

  const search = (e) => {
    if (e.key === "Enter")
      fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_KEY}`
      )
        .then((r) => r.json())
        .then((result) => {
          setWeather(result)
          setQuery("")
        })
  }

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  function handleChange(e) {
    setIsFar(e.target.checked)
    console.log("hello")
  }

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {isFar ? (
                  <div className="temp">
                    {celsiusToFahrenheit(Math.trunc(weather.main.temp))} F
                  </div>
                ) : (
                  <div className="temp">{Math.trunc(weather.main.temp)} ℃</div>
                )}
              </div>
              <div className="toggle-switch">
                {isFar ? (
                  <label style={{ color: "white" }}>Celcius</label>
                ) : (
                  <label style={{ color: "white" }}>Farenheight</label>
                )}
                <input
                  type="checkbox"
                  className="toggle-switch-checkbox"
                  name="toggleSwitch"
                  id="toggleSwitch"
                  checked={isFar}
                  onChange={handleChange}
                />
              </div>
              <div className="weather"> {weather.weather[0].main}</div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  )
}

export default App
