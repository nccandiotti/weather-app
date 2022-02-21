import React, { useState, useEffect } from "react"
import "./App.css"
const api = {
  key: "7870f2f515445b31d75696044a316c45",
  base: "https://api.openweathermap.org/data/2.5/",
}
const warmPicture =
  "https://github.com/TylerPottsDev/weather-react/blob/master/src/assets/warm-bg.jpg?raw=true"

const coolPicture =
  "https://raw.githubusercontent.com/TylerPottsDev/weather-react/master/src/assets/cold-bg.jpg"

//------------------------------------------

function App() {
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})

  const search = (e) => {
    if (e.key === "Enter")
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((r) => r.json())
        .then((result) => {
          setWeather(result)
          setQuery("")
          console.log(weather)
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
                <div className="temp">{Math.trunc(weather.main.temp)} ℃</div>
              </div>
              <div className="weather"> {weather.weather[0].main}</div>
            </div>{" "}
          </>
        ) : null}
      </main>
    </div>
  )
}

export default App
