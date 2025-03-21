import * as sx from "./Current.css";
import weatherCodeDescriptions from "../../assets/descriptions.json";
import dropIconUrl from "../../assets/humidity.svg?no-inline";
import windIconUrl from "../../assets/wind-speed.svg?no-inline";
import { GeoLocation, TemperatureUnit, WeatherCodeIconSize, WeatherData } from "../../types";
import { convertTemperature, convertWeatherCode } from "../../utils";
import SVG from "../utils/Svg";
import cx from "clsx/lite";

interface CurrentProps {
    geoData: GeoLocation;
    weatherData: WeatherData;
    tmpUnit: TemperatureUnit;
}

export default function Current({ geoData, weatherData, tmpUnit }: CurrentProps) {
    const { description, iconUrl } = convertWeatherCode(weatherCodeDescriptions, weatherData.current.weatherCode, !!weatherData.current.isDay,
        WeatherCodeIconSize.X4);

    return (
        <div className={sx.main}>
            <div className={cx(sx.locationContainer, sx.block)}>
                <div className={sx.firstName}>{geoData.name}</div>
                {geoData.admin1 ? <div className={sx.secondName}>{geoData.admin1}</div> : null}
            </div>
            <div className={cx(sx.valueContainer, sx.block)}>
                <div className={sx.temperatureContainer}>
                    <span className={sx.temperatureValue}>{convertTemperature(weatherData.current.temperature2m, tmpUnit)}</span>
                    <sup className={sx.temperatureUnit}>{tmpUnit === TemperatureUnit.Celsius ? "°C" : "°F"}</sup>
                </div>
                <div className={sx.subValueContainer}>
                    <div className={sx.subValue}>
                        <SVG className={sx.valueIcon} href={windIconUrl} width={800} height={800} ariaLabel="wind speed"></SVG>
                        <span className={sx.subValueUnit}>{weatherData.current.windSpeed10m.toFixed(0)} km/h</span>
                    </div>
                    <div className={sx.subValue}>
                        <SVG className={sx.valueIcon} href={dropIconUrl} width={800} height={800} ariaLabel="humidity"></SVG>
                        <span className={sx.subValueUnit}>{weatherData.current.relativeHumidity2m} %</span>
                    </div>
                </div>
            </div>
            <div className={cx(sx.iconContainer, sx.block)}>
                <div className={sx.icon} style={{ backgroundImage: `url("${iconUrl}")` }}></div>
                <div className={sx.description}>{description}</div>
            </div>
        </div>
    );
}
