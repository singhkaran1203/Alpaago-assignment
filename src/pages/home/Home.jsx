import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Temp from "../../components/navbar/Temp";
import "./home.css";
const Home = () => {
  const [cityInput, setCityInput] = useState("");
  const [cityTemp, setCityTemp] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const handleInputChange = (event) => {
    setCityInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const currentWeatherUrl = `${process.env.REACT_APP_WEATHER_API_URI}q=${cityInput}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    console.log(currentWeatherUrl);
    await fetch(currentWeatherUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.main);
        setCityTemp(data.main);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="App">
          <header className="App-header">
            <h3>WEATHER APP</h3>
            <form onSubmit={handleSubmit} id="" className="form">
              <input
                type="text"
                value={cityInput}
                onChange={handleInputChange}
              />

              {isLoading ? (
                <div className="loader"></div>
              ) : (
                <button type="submit">submit</button>
              )}
            </form>
            <div className="output">
              {isError ? "ERROR OCCURED" : <Temp data={cityTemp} />}
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Home;
