import { stylesheet } from "typestyle";
import { GeoLocation, WeatherData } from "../../types";

const sx = stylesheet({
    current: {}
});

interface CurrentProps {
    geoData: GeoLocation;
    weatherData: WeatherData
}

export default function Current({ geoData, weatherData }: CurrentProps) {
    return (
        <div className={sx.current}>
            <div>{geoData.name}</div>
            <div>目前氣溫</div>
            <div>天氣狀況</div>
            <div>風速</div>
            <div>濕度</div>
        </div>
    );
}
