import { stylesheet } from "typestyle";

const sx = stylesheet({
    search: {},
    searchBox: {},
    searchBtn: {},
    favoritesBtn: {},
    temperatureBtn: {}
});

export default function Search() {
    return (
        <div className={sx.search}>
            <input type="text" className={sx.searchBox} />
            <button className={sx.searchBtn}>Search</button>
            <button className={sx.favoritesBtn}>Favorites</button>
            <button className={sx.temperatureBtn}>°C/°F</button>
        </div>
    );
}
