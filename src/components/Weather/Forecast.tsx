import * as sx from "./Forecast.css";
import weatherCodeDescriptions from "../../assets/descriptions.json";
import { TemperatureUnit, WeatherCodeIconSize, WeatherData } from "../../types";
import { convertTemperature, convertWeatherCode } from "../../utils";
import cx from "clsx/lite";
import { useRef } from "react";

interface ForeCastProps {
    weatherData: WeatherData;
    tmpUnit: TemperatureUnit;
}

export default function Forecast({ weatherData, tmpUnit }: ForeCastProps) {
    const dateFormat = useRef(new Intl.DateTimeFormat("en-US", { month: "numeric", day: "numeric", weekday: "short" }));

    return (
        <ul className={cx(sx.forecast, sx.noListStyle)}>
            {Array.from({ length: 5 }, (_, i) => {
                const { description, iconUrl } = convertWeatherCode(weatherCodeDescriptions, weatherData.daily.weatherCode[i], true,
                    WeatherCodeIconSize.X4);
                const maxTemperture = convertTemperature(weatherData.daily.temperature2mMax[i], tmpUnit);
                const minTemperture = convertTemperature(weatherData.daily.temperature2mMin[i], tmpUnit);

                return (
                    <li key={i} className={sx.block} style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                        <div>{dateFormat.current.format(weatherData.daily.time[i])}</div>
                        <div className={sx.temperatureContainer}>
                            <span className={sx.temperatureValue}>{maxTemperture}/{minTemperture}</span>
                            <sup className={sx.temperatureUnit}>{tmpUnit === TemperatureUnit.Celsius ? "°C" : "°F"}</sup>
                        </div>
                        <div className={sx.icon} style={{ backgroundImage: `url("${iconUrl}")` }} aria-label={description}></div>
                    </li>
                );
            })}
        </ul>
    );
}
