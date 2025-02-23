import { stylesheet } from "typestyle";
import weatherCodeDescriptions from "../../assets/descriptions.json";
import { GeoLocation, TemperatureUnit, WeatherData } from "../../types";
import { convertTemperature, convertWeatherCode } from "../../utils";

const sx = stylesheet({
    current: {}
});

interface CurrentProps {
    geoData: GeoLocation;
    weatherData: WeatherData;
    tmpUnit: TemperatureUnit;
}

export default function Current({ geoData, weatherData, tmpUnit }: CurrentProps) {
    const { description } = convertWeatherCode(weatherCodeDescriptions, weatherData.current.weatherCode, !!weatherData.current.isDay);

    return (
        <div className={sx.current}>
            <div>Location: {geoData.name}{geoData.admin1 ? ` (${geoData.admin1})` : ""}</div>
            <div>Temperature: {convertTemperature(weatherData.current.temperature2m, tmpUnit)}</div>
            <div>Conditions: {description}</div>
            <div>Wind Speed: {weatherData.current.windSpeed10m.toFixed(0)}km/h</div>
            <div>Humidity: {weatherData.current.relativeHumidity2m}%</div>
        </div>
    );
}
