import "typestyle/lib/types";
import * as CSS from 'csstype';

export interface GeoCodingResponse {
    results: GeoLocation[];
}

export interface GeoLocation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string | undefined;
    admin1_id: number | undefined;
    admin3_id: number | undefined;
    admin4_id: number | undefined;
    timezone: string;
    population: number | undefined;
    postcodes: string[] | undefined;
    country_id: number | undefined;
    country: string | undefined;
    admin1: string | undefined;
    admin3: string | undefined;
    admin4: string | undefined;
}

export interface WeatherData {
    current: {
        time: Date;
        temperature2m: number;
        relativeHumidity2m: number;
        isDay: number;
        weatherCode: number;
        windSpeed10m: number;
    };
    daily: {
        time: Date[];
        weatherCode: Float32Array;
        temperature2mMax: Float32Array;
        temperature2mMin: Float32Array;
    };
}

export enum TemperatureUnit {
    Celsius,
    Fahrenheit
}

declare module "typestyle/lib/types" {
    interface CSSProperties {
        textWrap?: "wrap" | "nowrap" | "balance" | "pretty" | "stable" | CSS.Globals;
    }
}
