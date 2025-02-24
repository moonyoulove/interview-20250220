import { useRef } from "react";
import { classes as cx, stylesheet } from "typestyle";
import weatherCodeDescriptions from "../../assets/descriptions.json";
import { TemperatureUnit, WeatherCodeIconSize, WeatherData } from "../../types";
import { convertTemperature, convertWeatherCode } from "../../utils";

const sx = stylesheet({
    forecast: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px"
    },
    noListStyle: {
        listStyleType: "none",
        padding: 0,
        margin: 0
    },
    temperatureContainer: {},
    temperatureValue: {},
    temperatureUnit: {},
    icon: {
        aspectRatio: "1 / 1",
        backgroundSize: "140%",
        width: "80px",
        backgroundPosition: "center"
    },
    block: {
        width: "150px",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        gap: "3px",
        borderRadius: "10px",
        background: "linear-gradient(#F5F5DC, #ADD8E6)",
        boxShadow: "1px 1px 3px"
    }
});

interface ForeCastProps {
    weatherData: WeatherData;
    tmpUnit: TemperatureUnit;
}

export default function Forecast({ weatherData, tmpUnit }: ForeCastProps) {
    const dateFormat = useRef(new Intl.DateTimeFormat("en-US", { month: "numeric", day: "numeric", weekday: "short" }));
    return (
        <ul className={cx(sx.forecast, sx.noListStyle)}>
            {Array.from({ length: 5 }, (_, i) => {
                const { iconUrl } = convertWeatherCode(weatherCodeDescriptions, weatherData.daily.weatherCode[i], true, WeatherCodeIconSize.X4);
                const maxTemperture = convertTemperature(weatherData.daily.temperature2mMax[i], tmpUnit);
                const minTemperture = convertTemperature(weatherData.daily.temperature2mMin[i], tmpUnit);

                return (
                    <li key={i} className={sx.block}>
                        <div>{dateFormat.current.format(weatherData.daily.time[i])}</div>
                        <div className={sx.temperatureContainer}>
                            <span className={sx.temperatureValue}>{maxTemperture}/{minTemperture}</span>
                            <sup className={sx.temperatureUnit}>{tmpUnit === TemperatureUnit.Celsius ? "°C" : "°F"}</sup>
                        </div>
                        <div className={sx.icon} style={{ backgroundImage: `url("${iconUrl}")` }}></div>
                    </li>
                );
            })}
        </ul>
    );
}
