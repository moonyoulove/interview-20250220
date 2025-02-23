import { stylesheet } from "typestyle";
import weatherCodeDescriptions from "../../assets/descriptions.json";
import { TemperatureUnit, WeatherData } from "../../types";
import { convertTemperature, convertWeatherCode } from "../../utils";

const sx = stylesheet({
    forecast: {}
});

interface ForeCastProps {
    weatherData: WeatherData;
    tmpUnit: TemperatureUnit;
}

export default function Forecast({ weatherData, tmpUnit }: ForeCastProps) {
    const dateFormat = new Intl.DateTimeFormat("en-US", { month: "numeric", day: "numeric", weekday: "long" });
    return (
        <li className={sx.forecast}>
            {Array.from({ length: 5 }, (_, i) => {
                const { description } = convertWeatherCode(weatherCodeDescriptions, weatherData.daily.weatherCode[i], true);
                const maxTemperture = convertTemperature(weatherData.daily.temperature2mMax[i], tmpUnit);
                const minTemperture = convertTemperature(weatherData.daily.temperature2mMin[i], tmpUnit);

                return (
                    <ul key={i}>
                        <div>{dateFormat.format(weatherData.daily.time[i])}</div>
                        <div>{maxTemperture}/{minTemperture}</div>
                        <div>{description}</div>
                    </ul>
                );
            })}
        </li>
    );
}
