import { useRef } from "react";
import { Key } from "swr";
import { TriggerWithArgs } from "swr/mutation";
import { stylesheet } from "typestyle";
import { GeoCodingResponse, TemperatureUnit } from "../../types";
const sx = stylesheet({
    search: {},
    searchBox: {},
    searchBtn: {},
    temperatureBtn: {}
});

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
        <div className={sx.search}>
            <input type="text" className={sx.searchBox} ref={searchBoxRef} />
            <button className={sx.searchBtn} onClick={handleSearchBoxChange}>Search</button>
            <button className={sx.temperatureBtn} onClick={handleTmpUnitChange}>{tmpUnit === TemperatureUnit.Celsius ? "°C" : "°F"}</button>
        </div>
    );
}
