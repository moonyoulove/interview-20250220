import { useRef } from "react";
import { Key } from "swr";
import { TriggerWithArgs } from "swr/mutation";
import { stylesheet } from "typestyle";
import searchIconUrl from "../../assets/search.svg?no-inline";
import { GeoCodingResponse, TemperatureUnit } from "../../types";
import SVG from "../utils/Svg";

const sx = stylesheet({
    search: {
        display: "flex",
        gap: "5px",
    },
    searchBox: {
        borderRadius: "8px",
        border: "1px solid transparent",
        padding: "0.6em 1.2em",
        fontFamily: "inherit",
        transition: "border-color 0.25s",
        flex: 1,
        width: "100%",
        $nest: {
            "&:hover": {
                borderColor: "#646cff",
            },
        },
    },
    searchBtn: {},
    searchIcon: {
        display: "inline-block",
        width: "1rem",
        aspectRatio: "1 / 1",
        backgroundSize: "contain",
    },
    temperatureBtn: {},
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
        <form className={sx.search} onSubmit={(event) => event.preventDefault()}>
            <input type="text" className={sx.searchBox} ref={searchBoxRef} aria-label="location"/>
            <button type="submit" className={sx.searchBtn} onClick={handleSearchBoxChange} aria-label="search">
                <SVG className={sx.searchIcon} href={searchIconUrl} width={800} height={800}></SVG>
            </button>
            <button className={sx.temperatureBtn} onClick={handleTmpUnitChange}
                aria-label={tmpUnit === TemperatureUnit.Celsius ? "change to Fahrenheit" : "change to Celsius"}
            >
                {tmpUnit === TemperatureUnit.Celsius ? "°C" : "°F"}
            </button>
        </form>
    );
}
