import { classes as cx, stylesheet } from "typestyle";
import weatherCodeDescriptions from "../../assets/descriptions.json";
import dropIconUrl from "../../assets/humidity.svg";
import windIconUrl from "../../assets/wind-speed.svg";
import { GeoLocation, TemperatureUnit, WeatherData } from "../../types";
import { convertTemperature, convertWeatherCode, WeatherCodeIconSize } from "../../utils";
import SVG from "../utils/Svg";

const sx = stylesheet({
    current: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        $nest: {
            "> *": {
                border: "1px solid black"
            }
        }
    },
    iconContainer: {
        textAlign: "center",
        position: "relative"
    },
    icon: {
        width: "100%",
        height: "auto"
    },
    description: {
        position: "absolute",
        bottom: "10%",
        left: 0,
        right: 0
    },
    locationContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        textWrap: "balance"
    },
    firstName: {
        fontSize: "2rem"
    },
    secondName: {},
    valueContainer: {},
    block: {
        minWidth: "100px",
        maxWidth: "200px",
        aspectRatio: "1 / 1",
        flex: "1"
    },
    valueIcon: {
        width: "1rem"
    },
    temperatureValue: {
        fontSize: "3.5rem"
    },
    temperatureUnit: {
        verticalAlign: "top"
    }
});

interface CurrentProps {
    geoData: GeoLocation;
    weatherData: WeatherData;
    tmpUnit: TemperatureUnit;
}

export default function Current({ geoData, weatherData, tmpUnit }: CurrentProps) {
    const { description, iconUrl } = convertWeatherCode(weatherCodeDescriptions, weatherData.current.weatherCode, !!weatherData.current.isDay,
        WeatherCodeIconSize.X4);

    return (
        <div className={sx.current}>
            <div className={cx(sx.locationContainer, sx.block)}>
                <div className={sx.firstName}>{geoData.name}</div>
                {geoData.admin1 ? <div className={sx.secondName}>{geoData.admin1}</div> : null}
            </div>
            <div className={cx(sx.valueContainer, sx.block)}>
                <div>
                    <span className={sx.temperatureValue}>{convertTemperature(weatherData.current.temperature2m, tmpUnit)}</span>
                    <span className={sx.temperatureUnit}>{tmpUnit === TemperatureUnit.Celsius ? "°C" : "°F"}</span>
                </div>
                <div>
                    <SVG className={sx.valueIcon} href={windIconUrl} width={800} height={800}></SVG>
                    <span>{weatherData.current.windSpeed10m.toFixed(0)}km/h</span>
                </div>
                <div>
                    <SVG className={sx.valueIcon} href={dropIconUrl} width={800} height={800}></SVG>
                    <span>{weatherData.current.relativeHumidity2m}%</span>
                </div>
            </div>
            <div className={cx(sx.iconContainer, sx.block)}>
                <img className={sx.icon} src={iconUrl} width="200" height="200" />
                <div className={sx.description}>{description}</div>
            </div>
        </div>
    );
}
