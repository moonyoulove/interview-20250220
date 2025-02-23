import { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response";
import { fetchWeatherApi } from "openmeteo";
import useSWR from "swr";
import { stylesheet } from "typestyle";
import { GeoLocation, TemperatureUnit, WeatherData } from "../../types";
import Current from "../Current";
import Forecast from "../Forecast";

const sx = stylesheet({
    weather: {}
});

interface WeatherProps {
    geoData: GeoLocation;
    tmpUnit: TemperatureUnit;
}

export default function Weather({ geoData, tmpUnit }: WeatherProps) {
    const weatherRes = useSWR(() => {
        const params = {
            "latitude": geoData.latitude,
            "longitude": geoData.longitude,
            "current": ["temperature_2m", "relative_humidity_2m", "is_day", "weather_code", "wind_speed_10m"],
            "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min"]
        };
        return { url: "https://api.open-meteo.com/v1/forecast", params };
    }, fetchWeatherAndParse);

    if (weatherRes.error) {
        return <div>failed to load weather: {weatherRes.error.toString()}</div>;
    }
    if (weatherRes.isLoading) {
        return <div>loading weather...</div>;
    }
    if (!weatherRes.data) {
        return <div>no weather data</div>;
    }

    return (
        weatherRes.isLoading ? "Loading..." : (
            <>
                <Current geoData={geoData} weatherData={weatherRes.data} tmpUnit={tmpUnit}></Current>
                <Forecast weatherData={weatherRes.data} tmpUnit={tmpUnit}></Forecast>
            </>
        )
    );
}

async function fetchWeatherAndParse({ url, params }: { url: string; params: Record<string, string> }) {
    return fetchWeatherApi(url, params).then(parseWeatherData);
}

/**
 * from https://open-meteo.com/en/docs
 */
function parseWeatherData(responses: WeatherApiResponse[]) {
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData: WeatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            relativeHumidity2m: current.variables(1)!.value(),
            isDay: current.variables(2)!.value(),
            weatherCode: current.variables(3)!.value(),
            windSpeed10m: current.variables(4)!.value()
        },
        daily: {
            time: getTimeRange(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
            temperature2mMin: daily.variables(2)!.valuesArray()!
        }
    };

    return weatherData;
}

// Helper function to form time ranges
function getTimeRange(start: number, stop: number, step: number) {
    return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
}
