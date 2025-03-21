 
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

export interface WeatherCodeDescription {
    description: string;
    icon: string;
}

export enum WeatherCodeIconSize {
    X1 = "",
    X2 = "@2x",
    X4 = "@4x"
}

/**
 * from https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
 */
export interface WeatherCodeDescriptions {
    [dayIndex: string]: {
        day: WeatherCodeDescription;
        night: WeatherCodeDescription;
    };
}