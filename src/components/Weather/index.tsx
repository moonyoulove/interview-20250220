import { stylesheet } from "typestyle";

const sx = stylesheet({
    weather: {}
});

export default function Weather() {
    return (
        <div className={sx.weather}>
            <div>城市名稱</div>
            <div>目前氣溫</div>
            <div>天氣狀況</div>
            <div>風速</div>
            <div>濕度</div>
        </div>
    );
}
