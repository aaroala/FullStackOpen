import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({filteredCountries, weather}) => {
  console.log(filteredCountries.length)
  console.log(weather, "weather")

  if (filteredCountries.length !== 1)  return ("")
  const country = filteredCountries[0]
  if (weather.length === 0)  return (<div>Weather in {country.capital}</div>)

  return(
    <div>
      <h3>Weather in {country.capital}</h3>
      temperature: {weather.main.temp - 272.15} °C
      <div>
      wind: {weather.wind.speed} m/s
      </div>
    </div>

  )

}

const Country = ({filteredCountries, setFilterCountry}) => {
  const handleShow = (event) => {
    event.preventDefault()
    setFilterCountry(event.target.name)
  }

  if (filteredCountries.length > 10) return(<div>Too many found</div>)
  else if (filteredCountries.length === 1)
  return(
    <div>
      {filteredCountries.map(country => { return(
        <div>
          <h4>{country.name.common}</h4>
          area: {country.area}
          <h3>languages:</h3>
          <ul>
            {Object.values(country["languages"]).map((language, i) =>
            <li key={i}>{language}</li>
            )}
          </ul>
          <img src={country["flags"].png} alt=""/>
        </div>
      )})}
    </div>
    )
  else
  return(
    <div>
      {filteredCountries.map(country => (
        <li>
          {country.name.common}
          <button onClick={handleShow} name={country.name.common}>show</button>
        </li>
      ))}
    </div>
    )

}

const App = () => {

  const API_KEY = process.env.REACT_APP_API_KEY

  const [data, setData] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [weather, setWeather] = useState([])

  const handleCountryFilter = (event) => {
    setFilterCountry(event.target.value)

    if (filteredCountries.length === 1) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital}&appid=${API_KEY}`)
        .then(response => {
          console.log('promise fulfilled', response.data)
          setWeather(response.data)
        })
    }
  }

  

  const hook = () => {
    console.log('sending promise')
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        console.log('promise fulfilled')
        setData(response.data)
      })
  }
  useEffect(hook, [])

  const filteredCountries = data.filter(country => country["name"]["common"].toLowerCase().includes(filterCountry.toLowerCase()))
  return(
    <div>
      <h1>Find countries</h1>
      <input value={filterCountry} onChange={handleCountryFilter}/>
      <Country filteredCountries={filteredCountries} setFilterCountry={setFilterCountry}/>
      <Weather filteredCountries={filteredCountries} weather={weather}/>
    </div>
  )

}

export default App