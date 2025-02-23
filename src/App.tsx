import { Key } from "swr";
import useSWRMutation, { SWRMutationResponse } from "swr/mutation";
import { cssRule } from "typestyle";
import Search from "./components/Search";
import Weather from "./components/Weather";
import { GeoCodingResponse } from "./types";

cssRule(`#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
`);

export default function App() {
    const geoRes = useSWRMutation("https://geocoding-api.open-meteo.com/v1/search", fetchGeoCoding);

    return (
        <>
            <Search geoFetchTrigger={geoRes.trigger}></Search>
            <GeoResponse geoRes={geoRes}>
                <Weather geoData={geoRes.data!.results[0]}></Weather>
            </GeoResponse>
        </>
    );
}

interface GeoResponseProps {
    geoRes: SWRMutationResponse<GeoCodingResponse, unknown, Key, Record<string, string>>;
    children: React.ReactNode;
}

function GeoResponse({ geoRes, children }: GeoResponseProps) {
    if (geoRes.error) {
        return <div>failed to search location</div>;
    }
    if (geoRes.isMutating) {
        return <div>search location...</div>;
    }
    if (!geoRes.data) {
        return <div>no location data</div>;
    }
    return children;
}

async function fetchGeoCoding(urlStr: string, { arg: params }: { arg: Record<string, string> }): Promise<GeoCodingResponse> {
    const url = new URL(urlStr);
    for (const name in params) {
        url.searchParams.set(name, params[name]);
    }
    return fetch(url).then((res) => res.json());
}
