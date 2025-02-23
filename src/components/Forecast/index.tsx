import { stylesheet } from "typestyle";
import { GeoLocation, WeatherData } from "../../types";

const sx = stylesheet({
    forecast: {}
});

interface ForeCastProps {
    weatherData: WeatherData;
}

export default function Forecast({ weatherData }: ForeCastProps) {
    return (
        <li className={sx.forecast}>
            <ul>
                <div>日期</div>
                <div>預測氣溫</div>
                <div>天氣狀況</div>
            </ul>
            <ul>
                <div>日期</div>
                <div>預測氣溫</div>
                <div>天氣狀況</div>
            </ul>
            <ul>
                <div>日期</div>
                <div>預測氣溫</div>
                <div>天氣狀況</div>
            </ul>
            <ul>
                <div>日期</div>
                <div>預測氣溫</div>
                <div>天氣狀況</div>
            </ul>
            <ul>
                <div>日期</div>
                <div>預測氣溫</div>
                <div>天氣狀況</div>
            </ul>
        </li>
    );
}
