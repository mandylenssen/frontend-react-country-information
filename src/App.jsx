import './App.css';
import {useState} from "react";
import axios from "axios";
import regionColor from "./helpers/regionColor.js";
import './helpers/regionColor.css';
import worldMap from './assets/world_map.png'
import globe from './assets/globe.png'
import formatToMillions from "./helpers/formatToMillions.js";


function App() {


    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');
    const [countryInformation, setCountryInformation] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    async function fetchAllCountries() {
        try {
            setError('');
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const sortedCountries = response.data.sort((a, b) => {
                return (a.population) - (b.population);
            });
            setCountries(sortedCountries);

        } catch (e) {
            console.error(e);
            setError('Het ophalen van de data is mislukt. Probeer het opnieuw');
        }
    }


    async function fetchCountryInformation() {
        setError('');
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}?fullText=true`);
            console.log(response.data)
            setCountryInformation(response.data);
            setSearchQuery('');
        } catch (e) {
            console.error(e);
            setError(`${searchQuery} bestaat niet. Probeer het opnieuw`);
        }
    }


    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCountryInformation();
    };



    return (
        <>

            <img className="worldMap" src={worldMap} alt="world-map-img"/>
            <h1>World Regions</h1>
            <button type="submit" onClick={fetchAllCountries}>
                Get info
            </button>
            {error && <p className="error">{error}</p>}


            {countries.length > 0 && (
                <ul>
                    {countries.map((country, index) => (
                        <li key={index} className={`country ${regionColor(country.region)}`}>
                            <img className="flagImages" src={country.flags.svg}
                                 alt={`${country.name.common} flag`}/> {country.name.common} <span
                            className="populationText">Has a population of {country?.population} people</span>
                        </li>
                    ))}
                </ul>
            )}


            <h1>Search country information</h1>
            <img className="globeImage" src={globe} alt="globe-img"/>
            <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Bijvoorbeeld Nederland of Peru"
                value={searchQuery}
                onChange={handleInputChange}
            />
            <button type="submit">
                Zoek
            </button>
            </form>
            {error && <p className="error">{error}</p>}


            <ul>
                {countryInformation.map((country, index) => {
                    return <li key={index}><img className="flagImages" src={country.flags.svg}
                                                alt={`${country.name.common} flag`}/> {country.name.common}
                        <p>is situated in {country.subregion} and the capital is {country.capital}</p>
                        <p>It has a population of {formatToMillions(country?.population)} million
                            people {country.borders && country.borders.length > 0 && ` and borders with ${country.borders.length} neighboring countries`}
                        </p></li>
                })}</ul>


        </>
    )
}


export default App;
