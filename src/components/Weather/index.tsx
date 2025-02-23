import { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response";
import { fetchWeatherApi } from "openmeteo";
import useSWR from "swr";
import { stylesheet } from "typestyle";
import { GeoCodingResponse, GeoLocation, WeatherData } from "../../types";
import Current from "../Current";
import Forecast from "../Forecast";

const sx = stylesheet({
    weather: {}
});

interface WeatherProps {
    geoData: GeoLocation;
}

export default function Weather({ geoData }: WeatherProps) {
    const weatherRes = useSWR(() => {
        const params = {
            "latitude": geoData.latitude,
            "longitude": geoData.longitude,
            "current": ["temperature_2m", "relative_humidity_2m", "is_day", "weather_code", "wind_speed_10m"],
            "forecast_days": 1
        };
        return ["https://api.open-meteo.com/v1/forecast", params];
    }, (...args) => console.log("Fetch:", ...args));
    if (weatherRes.error) {
        return <div>failed to load weather</div>;
    }
    if (weatherRes.isLoading) {
        return <div>loading weather...</div>;
    }
    if (!weatherRes.data) {
        return <div>no weather data</div>;
    }

    const weatherData = parseWeatherData(weatherRes.data);

    return (
        weatherRes.isLoading ? "Loading..." : (
            <>
                <Current geoData={geoData} weatherData={weatherData}></Current>
                <Forecast weatherData={weatherData}></Forecast>
            </>
        )
    );
}

async function fetchWeather(urlStr: string, { arg }: { arg: Record<string, string> }): Promise<GeoCodingResponse> {
    const url = new URL(urlStr);
    for (const param in arg) {
        url.searchParams.set(param, arg[param]);
    }
    return fetch(url).then((res) => res.json());
}

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
