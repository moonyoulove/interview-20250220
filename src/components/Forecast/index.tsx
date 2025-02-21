import { stylesheet } from "typestyle";

const sx = stylesheet({
    forecast: {}
});

export default function Forecast() {
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
