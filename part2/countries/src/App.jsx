import { useState, useEffect } from "react";
import "./App.css";
import countriesService from "./services/countries";

const Notification = ({ message, onClose }) => {
  if (message.text) {
    return (
      <>
        <div className={message.className}>
          {message.text}
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>
      </>
    );
  }
  return null;
};

const Filter = (props) => (
  <>
    find countries{" "}
    <input value={props.value} onChange={props.handleFilterChange} />
  </>
);

const Countries = (props) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  if (props.countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (props.countries.length <= 10 && props.countries.length > 1) {
    return (
      <div>
        {props.countries.map((country) => {
          return (
            <div key={crypto.randomUUID()}>
              <div className="country-item">
                <p>{country.name.common}</p>
                <button
                  onClick={() =>
                    setSelectedCountry(
                      selectedCountry === country ? null : country
                    )
                  }
                >
                  {selectedCountry === country ? "Hide" : "Show"}
                </button>
              </div>
              <div className="country-detail">
                {selectedCountry === country && <Country country={country} />}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  if (props.countries.length === 1) {
    return (
      <div className="country-detail">
        <Country country={props.countries[0]} />
      </div>
    );
  }
};

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    countriesService
      .getWeather(country.capital[0])
      .then((weatherResponse) => {
        setWeather({
          temperature: weatherResponse.current.temp_c,
          wind: weatherResponse.current.wind_mph,
          icon: weatherResponse.current.condition.icon,
          iconAlt: weatherResponse.current.condition.text,
        });
      })
      .catch((error) => {
        console.log(`Error al obtener actualización del clima, ${error}`);
      });
  }, []);
  const formatCapital = (capitals) =>
    capitals.length === 1 ? capitals[0] : capitals.join(", ");
  const languages = Object.values(country.languages);
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>Capital: {formatCapital(country.capital)}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weather && (
        <>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature {weather.temperature} Celsius</p>
          <img src={weather.icon} alt={weather.iconAlt} />
          <p>Wind ${weather.wind} m/s</p>
        </>
      )}
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState({ text: "", className: "" });
  const [showNotification, setShowNotification] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then((countriesResponse) => setCountries(countriesResponse))
      .catch(() => {
        setMessage({
          text: "Error getting countries data from API",
          className: "error",
        });
        setShowNotification(true);
      });
  }, []);

  const countriesShow = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  return (
    <div>
      {showNotification && (
        <Notification
          message={message}
          onClose={() => setShowNotification(false)}
        />
      )}
      <Filter
        value={filter}
        handleFilterChange={(event) => setFilter(event.target.value)}
      />
      {filter.length !== 0 && <Countries countries={countriesShow} />}
    </div>
  );
}

export default App;
