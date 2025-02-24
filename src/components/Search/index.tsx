import { useRef } from "react";
import { Key } from "swr";
import { TriggerWithArgs } from "swr/mutation";
import { stylesheet } from "typestyle";
import searchIconUrl from "../../assets/search.svg";
import { GeoCodingResponse, TemperatureUnit } from "../../types";

const sx = stylesheet({
    search: {
        display: "flex",
        gap: "5px"
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
                borderColor: "#646cff"
            }
        }
    },
    searchBtn: {},
    searchIcon: {
        display: "inline-block",
        width: "1rem",
        aspectRatio: "1 / 1",
        backgroundSize: "contain",
    },
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
            <button className={sx.searchBtn} onClick={handleSearchBoxChange}>
                <div className={sx.searchIcon} style={{ backgroundImage: `url(${searchIconUrl})` }}></div>
            </button>
            <button className={sx.temperatureBtn} onClick={handleTmpUnitChange}>{tmpUnit === TemperatureUnit.Celsius ? "°C" : "°F"}</button>
        </div>
    );
}
