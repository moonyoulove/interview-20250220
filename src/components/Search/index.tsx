import { stylesheet } from "typestyle";

const sx = stylesheet({
    search: {},
    searchBox: {},
    searchBtn: {}
});

export default function Search() {
    return (
        <div className={sx.search}>
            <input type="text" className={sx.searchBox} />
            <button className={sx.searchBtn}>Search</button>
            <button className={sx.searchBtn}>Favorites</button>
            <button className={sx.searchBtn}>°C/°F</button>
        </div>
    );
}
