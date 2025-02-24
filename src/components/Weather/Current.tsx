import { classes as cx, keyframes, stylesheet } from "typestyle";
import weatherCodeDescriptions from "../../assets/descriptions.json";
import dropIconUrl from "../../assets/humidity.svg";
import windIconUrl from "../../assets/wind-speed.svg";
import { GeoLocation, TemperatureUnit, WeatherCodeIconSize, WeatherData } from "../../types";
import { convertTemperature, convertWeatherCode } from "../../utils";

const cardAnimation = keyframes({
    "0%": { transform: "rotateX(180deg)", filter: "grayscale(0%)" },
    "30%": { filter: "grayscale(0%)" },
    "50%": { filter: "grayscale(100%)" },
    "100%": { transform: "rotateX(360deg)" }
});

const sx = stylesheet({
    current: {
        maxWidth: "600px",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        borderRadius: "10px",
        paddingInline: "10px",
        background: "linear-gradient(#CAAFCF, #F5F5DC)",
        boxShadow: "1px 1px 3px",
        animationName: cardAnimation,
        animationDuration: "1s",
        animationTimingFunction: "ease-out"
    },
    iconContainer: {},
    icon: {
        aspectRatio: "1 / 1",
        backgroundSize: "140%",
        width: "80px",
        backgroundPosition: "center"
    },
    description: {},
    locationContainer: {
        alignItems: "center",
        textAlign: "center",
        textWrap: "balance",
        overflowWrap: "anywhere"
    },
    firstName: {
        fontSize: "2rem"
    },
    secondName: {},
    valueContainer: {
        flexDirection: "column"
    },
    block: {
        minWidth: "100px",
        aspectRatio: "1 / 1",
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "5px",
        boxSizing: "content-box"
    },
    valueIcon: {
        display: "inline-block",
        width: "1rem",
        aspectRatio: "1 / 1",
        backgroundSize: "contain",
        marginRight: "2px",
        verticalAlign: "text-top"
    },
    temperatureContainer: {
        fontSize: "3.5rem"
    },
    temperatureValue: {},
    temperatureUnit: {
        verticalAlign: "text-top",
        top: "1em",
        fontSize: "30%"
    },
    subValueContainer: {
        display: "flex",
        gap: "10px",
        width: "100%",
        justifyContent: "center"
    },
    subValue: {},
    subValueUnit: {
        whiteSpace: "nowrap"
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
                <div className={sx.temperatureContainer}>
                    <span className={sx.temperatureValue}>{convertTemperature(weatherData.current.temperature2m, tmpUnit)}</span>
                    <sup className={sx.temperatureUnit}>{tmpUnit === TemperatureUnit.Celsius ? "°C" : "°F"}</sup>
                </div>
                <div className={sx.subValueContainer}>
                    <div className={sx.subValue}>
                        <span className={sx.valueIcon} style={{ backgroundImage: `url("${windIconUrl}")` }}></span>
                        <span className={sx.subValueUnit}>{weatherData.current.windSpeed10m.toFixed(0)} km/h</span>
                    </div>
                    <div className={sx.subValue}>
                        <span className={sx.valueIcon} style={{ backgroundImage: `url("${dropIconUrl}")` }}></span>
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
