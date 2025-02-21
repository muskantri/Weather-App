import React, { useState } from 'react';
import './Weather.css';
import './assests/cold.jpg';
import './assests/warm.jpg';


const api = {
    key: "a3477c107611f03a56062c417167255e",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    }

    const dateBuilder = (d) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const day = days[d.getDay()];
        const date = d.getDate();
        const year = d.getFullYear();
        const month = months[d.getMonth()];
        return `${day} ${date} ${month} ${year}`;

    }

    return (
        <div className={(typeof weather.main != "undefined") ?
            ((weather.main.temp > 16) ? 'app-warm' : 'app') : 'app'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        value={query}
                        onChange={e => { setQuery(e.target.value) }}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <><div className='location-box'>
                        <div className='location-bar'>
                            {weather.name}, {weather.sys.country}
                        </div>
                        <div className='date-bar'>
                            {dateBuilder(new Date())}
                        </div>
                    </div>
                        <div className='weather-box'>
                            <div className="temp">
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>

                        </div></>
                ) : ('')}


            </main>
        </div>
    )
}

export default Weather;


