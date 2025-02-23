import { useRef } from "react";
import { TriggerWithArgs } from "swr/mutation";
import { stylesheet } from "typestyle";
import { GeoCodingResponse } from "../../types";
import { Key } from "swr";
const sx = stylesheet({
    search: {},
    searchBox: {},
    searchBtn: {},
    favoritesBtn: {},
    temperatureBtn: {}
});

interface SearchProps {
    geoFetchTrigger: TriggerWithArgs<GeoCodingResponse, unknown, Key, Record<string, string>>;
}

export default function Search({ geoFetchTrigger }: SearchProps) {
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
            <button className={sx.favoritesBtn}>Favorites</button>
            <button className={sx.temperatureBtn}>°C/°F</button>
        </div>
    );
}
