import "./App.css";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import Infobox from "./Infobox";
import Table from "./Table.js";
import LineGraph from "./LineGraph.js";
import { CardContent, Card } from "@mui/material";
import { sortData, prettyPrintStat } from "./useful";
import numeral from "numeral";
import Map from "./Map.js";

import "leaflet/dist/leaflet.css";
function App() {
  const [Countries, setCountries] = useState([]);
  const [country, setcountry] = useState("Worldwide");
  const [CountryInfo, setCountryInfo] = useState({});
  const [tableData, settableData] = useState([]);
  const [MapCenter, setMapCenter] = useState([40.52, 34.34]);
  const [zoom, setzoom] = useState(5);
  const [MapCountries, setMapCountries] = useState([]);

  const [casesType, setCasesType] = useState("cases");

  //load the worldwide url
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  //load the country using useEffect
  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
          settableData(data);
          setMapCountries(data);
        });
    };
    getCountries();
  }, []);

  const onchangeCountry = async (e) => {
    const countrycode = e.target.value;

    const url =
      countrycode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countrycode}`;
    await fetch(url)
      .then((respone) => respone.json())
      .then((data) => {
        setcountry(countrycode);
        setCountryInfo(data);
        countrycode === "Worldwide"
          ? setMapCenter([40.52, 34.34])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setzoom(5);
        // console.log([data.countryInfo.lat, data.countryInfo.long]);
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app__header">
          <h1>Covid Tracker</h1>

          <FormControl className="app_dropdown">
           
            <Select
              variant="outlined"
              value={country}
              
              onChange={onchangeCountry}
             
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {Countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_infoBox">
          <Infobox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(CountryInfo.todayCases)}
            total={numeral(CountryInfo.cases).format("0.0a")}
          />
          <Infobox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(CountryInfo.todayRecovered)}
            total={numeral(CountryInfo.recovered).format("0.0a")}
          />
          <Infobox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(CountryInfo.todayDeaths)}
            total={numeral(CountryInfo.deaths).format("0.0a")}
          />
        </div>
        <Map
          center={MapCenter}
          zoom={zoom}
          countries={MapCountries}
          casesType={casesType}
        />
      </div>

      <Card className="app_right">
        <CardContent>
          <h2> Live Cases by country</h2>
          <Table countries={sortData(tableData)}></Table>
        </CardContent>
        <CardContent>
          <LineGraph casesType={casesType} className="linegraph" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
