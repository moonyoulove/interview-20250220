import { useState } from "react";
import { Key } from "swr";
import useSWRMutation, { SWRMutationResponse } from "swr/mutation";
import { cssRule } from "typestyle";
import Search from "./components/Search";
import Weather from "./components/Weather";
import { GeoCodingResponse, TemperatureUnit } from "./types";

cssRule("#root", {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "2rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    background: "linear-gradient(#ADD8E6, #F5F5DC, #CAAFCF)"
});

export default function App() {
    const geoRes = useSWRMutation("https://geocoding-api.open-meteo.com/v1/search", fetchGeoCoding);
    const [tmpUnit, setTmpUnit] = useState(TemperatureUnit.Celsius);

    function handleTmpUnitChange() {
        setTmpUnit((prev: TemperatureUnit) => (prev === TemperatureUnit.Celsius ? TemperatureUnit.Fahrenheit : TemperatureUnit.Celsius));
    }

    return (
        <>
            <Search geoFetchTrigger={geoRes.trigger} handleTmpUnitChange={handleTmpUnitChange} tmpUnit={tmpUnit}></Search>
            <GeoResponse geoRes={geoRes} tmpUnit={tmpUnit}></GeoResponse>
        </>
    );
}

interface GeoResponseProps {
    geoRes: SWRMutationResponse<GeoCodingResponse, unknown, Key, Record<string, string>>;
    tmpUnit: TemperatureUnit;
}

function GeoResponse({ geoRes, tmpUnit }: GeoResponseProps) {
    if (geoRes.error) {
        return <div>failed to search location</div>;
    }
    if (geoRes.isMutating) {
        return <div>search location...</div>;
    }
    const geoData = geoRes.data?.results?.[0];
    if (!geoData) {
        return <div>no location data</div>;
    }
    return <Weather geoData={geoData} tmpUnit={tmpUnit}></Weather>;
}

async function fetchGeoCoding(urlStr: string, { arg: params }: { arg: Record<string, string> }): Promise<GeoCodingResponse> {
    const url = new URL(urlStr);
    for (const name in params) {
        url.searchParams.set(name, params[name]);
    }
    return fetch(url).then((res) => res.json());
}
