import useSWRMutation from "swr/mutation";
import { stylesheet } from "typestyle";
import { useDebounce } from "../../utils";

const sx = stylesheet({
    search: {},
    searchBox: {},
    searchBtn: {},
    favoritesBtn: {},
    temperatureBtn: {}
});

export default function Search() {
    const { trigger, data, error } = useSWRMutation("https://geocoding-api.open-meteo.com/v1/search", fetchedGeoCoding);

    const handleSearchBoxChange = useDebounce((event) => {
        trigger({ name: event.target.value });
    }, 1000);
    return (
        <div className={sx.search}>
            <input type="text" className={sx.searchBox} onChange={handleSearchBoxChange} />
            {data ? JSON.stringify(data) : false}
            <button className={sx.searchBtn}>Search</button>
            <button className={sx.favoritesBtn}>Favorites</button>
            <button className={sx.temperatureBtn}>°C/°F</button>
        </div>
    );
}

interface GeoCodingData {
    name: string;
    latitude: number;
    longitude: number;
}

async function fetchedGeoCoding(urlStr: string, { arg }: { arg: { [param: string]: string } }): Promise<GeoCodingData> {
    const url = new URL(urlStr);
    for (const param in arg) {
        url.searchParams.set(param, arg[param]);
    }
    return fetch(url).then((res) => res.json());
}
