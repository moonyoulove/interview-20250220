import * as sx from "./index.css";
import searchIconUrl from "../../assets/search.svg?no-inline";
import { GeoCodingResponse, TemperatureUnit } from "../../types";
import SVG from "../utils/Svg";
import { useRef } from "react";
import { Key } from "swr";
import { TriggerWithArgs } from "swr/mutation";

interface SearchProps {
    geoFetchTrigger: TriggerWithArgs<GeoCodingResponse, unknown, Key, Record<string, string>>;
    handleTmpUnitChange: () => void;
    tmpUnit: TemperatureUnit;
}

export default function Search({ geoFetchTrigger, handleTmpUnitChange, tmpUnit }: SearchProps) {
    const searchBoxRef = useRef<HTMLInputElement>(null);
    function handleSearchBoxChange() {
        if (searchBoxRef.current) {
            geoFetchTrigger({ name: searchBoxRef.current.value });
        }
    }

    return (
        <form className={sx.main} onSubmit={(event) => event.preventDefault()}>
            <input type="text" className={sx.box} ref={searchBoxRef} aria-label="location" />
            <button type="submit" className={sx.submit} onClick={handleSearchBoxChange} aria-label="search">
                <SVG className={sx.icon} href={searchIconUrl} width={800} height={800}></SVG>
            </button>
            <button className={sx.temperature} onClick={handleTmpUnitChange}
                aria-label={tmpUnit === TemperatureUnit.Celsius ? "change to Fahrenheit" : "change to Celsius"}
            >
                {tmpUnit === TemperatureUnit.Celsius ? "°C" : "°F"}
            </button>
        </form>
    );
}
