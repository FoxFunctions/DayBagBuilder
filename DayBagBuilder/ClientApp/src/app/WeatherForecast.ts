// To parse this data:
//
//   import { Convert, WeatherForecast } from "./file";
//
//   const weatherForecast = Convert.toWeatherForecast(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface WeatherForecast {
    location: Location;
    current:  Current;
    forecast: Forecast;
    alerts:   Alerts;
}

export interface Alerts {
    alert: Alert[];
}

export interface Alert {
    headline:    string;
    msgtype:     string;
    severity:    string;
    urgency:     string;
    areas:       string;
    category:    string;
    certainty:   string;
    event:       string;
    note:        string;
    effective:   Date;
    expires:     Date;
    desc:        string;
    instruction: string;
}

export interface Current {
    last_updated_epoch: number;
    last_updated:       string;
    temp_c:             number;
    temp_f:             number;
    is_day:             number;
    condition:          Condition;
    wind_mph:           number;
    wind_kph:           number;
    wind_degree:        number;
    wind_dir:           WindDir;
    pressure_mb:        number;
    pressure_in:        number;
    precip_mm:          number;
    precip_in:          number;
    humidity:           number;
    cloud:              number;
    feelslike_c:        number;
    feelslike_f:        number;
    vis_km:             number;
    vis_miles:          number;
    uv:                 number;
    gust_mph:           number;
    gust_kph:           number;
    air_quality:        { [key: string]: number };
}

export interface Condition {
    text: string;
    icon: string;
    code: number;
}

export enum WindDir {
    N = "N",
    Nnw = "NNW",
    Nw = "NW",
    Ssw = "SSW",
    Sw = "SW",
    W = "W",
    Wnw = "WNW",
    Wsw = "WSW",
}

export interface Forecast {
    forecastday: Forecastday[];
}

export interface Forecastday {
    date:       Date;
    date_epoch: number;
    day:        Day;
    astro:      Astro;
    hour:       Hour[];
}

export interface Astro {
    sunrise:           string;
    sunset:            string;
    moonrise:          string;
    moonset:           string;
    moon_phase:        string;
    moon_illumination: string;
}

export interface Day {
    maxtemp_c:            number;
    maxtemp_f:            number;
    mintemp_c:            number;
    mintemp_f:            number;
    avgtemp_c:            number;
    avgtemp_f:            number;
    maxwind_mph:          number;
    maxwind_kph:          number;
    totalprecip_mm:       number;
    totalprecip_in:       number;
    avgvis_km:            number;
    avgvis_miles:         number;
    avghumidity:          number;
    daily_will_it_rain:   number;
    daily_chance_of_rain: number;
    daily_will_it_snow:   number;
    daily_chance_of_snow: number;
    condition:            Condition;
    uv:                   number;
}

export interface Hour {
    time_epoch:     number;
    time:           string;
    temp_c:         number;
    temp_f:         number;
    is_day:         number;
    condition:      Condition;
    wind_mph:       number;
    wind_kph:       number;
    wind_degree:    number;
    wind_dir:       WindDir;
    pressure_mb:    number;
    pressure_in:    number;
    precip_mm:      number;
    precip_in:      number;
    humidity:       number;
    cloud:          number;
    feelslike_c:    number;
    feelslike_f:    number;
    windchill_c:    number;
    windchill_f:    number;
    heatindex_c:    number;
    heatindex_f:    number;
    dewpoint_c:     number;
    dewpoint_f:     number;
    will_it_rain:   number;
    chance_of_rain: number;
    will_it_snow:   number;
    chance_of_snow: number;
    vis_km:         number;
    vis_miles:      number;
    gust_mph:       number;
    gust_kph:       number;
    uv:             number;
}

export interface Location {
    name:            string;
    region:          string;
    country:         string;
    lat:             number;
    lon:             number;
    tz_id:           string;
    localtime_epoch: number;
    localtime:       string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toWeatherForecast(json: string): WeatherForecast {
        return cast(JSON.parse(json), r("WeatherForecast"));
    }

    public static weatherForecastToJson(value: WeatherForecast): string {
        return JSON.stringify(uncast(value, r("WeatherForecast")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "WeatherForecast": o([
        { json: "location", js: "location", typ: r("Location") },
        { json: "current", js: "current", typ: r("Current") },
        { json: "forecast", js: "forecast", typ: r("Forecast") },
        { json: "alerts", js: "alerts", typ: r("Alerts") },
    ], false),
    "Alerts": o([
        { json: "alert", js: "alert", typ: a(r("Alert")) },
    ], false),
    "Alert": o([
        { json: "headline", js: "headline", typ: "" },
        { json: "msgtype", js: "msgtype", typ: "" },
        { json: "severity", js: "severity", typ: "" },
        { json: "urgency", js: "urgency", typ: "" },
        { json: "areas", js: "areas", typ: "" },
        { json: "category", js: "category", typ: "" },
        { json: "certainty", js: "certainty", typ: "" },
        { json: "event", js: "event", typ: "" },
        { json: "note", js: "note", typ: "" },
        { json: "effective", js: "effective", typ: Date },
        { json: "expires", js: "expires", typ: Date },
        { json: "desc", js: "desc", typ: "" },
        { json: "instruction", js: "instruction", typ: "" },
    ], false),
    "Current": o([
        { json: "last_updated_epoch", js: "last_updated_epoch", typ: 0 },
        { json: "last_updated", js: "last_updated", typ: "" },
        { json: "temp_c", js: "temp_c", typ: 3.14 },
        { json: "temp_f", js: "temp_f", typ: 0 },
        { json: "is_day", js: "is_day", typ: 0 },
        { json: "condition", js: "condition", typ: r("Condition") },
        { json: "wind_mph", js: "wind_mph", typ: 3.14 },
        { json: "wind_kph", js: "wind_kph", typ: 0 },
        { json: "wind_degree", js: "wind_degree", typ: 0 },
        { json: "wind_dir", js: "wind_dir", typ: r("WindDir") },
        { json: "pressure_mb", js: "pressure_mb", typ: 0 },
        { json: "pressure_in", js: "pressure_in", typ: 3.14 },
        { json: "precip_mm", js: "precip_mm", typ: 0 },
        { json: "precip_in", js: "precip_in", typ: 0 },
        { json: "humidity", js: "humidity", typ: 0 },
        { json: "cloud", js: "cloud", typ: 0 },
        { json: "feelslike_c", js: "feelslike_c", typ: 3.14 },
        { json: "feelslike_f", js: "feelslike_f", typ: 3.14 },
        { json: "vis_km", js: "vis_km", typ: 0 },
        { json: "vis_miles", js: "vis_miles", typ: 0 },
        { json: "uv", js: "uv", typ: 0 },
        { json: "gust_mph", js: "gust_mph", typ: 3.14 },
        { json: "gust_kph", js: "gust_kph", typ: 3.14 },
        { json: "air_quality", js: "air_quality", typ: m(3.14) },
    ], false),
    "Condition": o([
        { json: "text", js: "text", typ: "" },
        { json: "icon", js: "icon", typ: "" },
        { json: "code", js: "code", typ: 0 },
    ], false),
    "Forecast": o([
        { json: "forecastday", js: "forecastday", typ: a(r("Forecastday")) },
    ], false),
    "Forecastday": o([
        { json: "date", js: "date", typ: Date },
        { json: "date_epoch", js: "date_epoch", typ: 0 },
        { json: "day", js: "day", typ: r("Day") },
        { json: "astro", js: "astro", typ: r("Astro") },
        { json: "hour", js: "hour", typ: a(r("Hour")) },
    ], false),
    "Astro": o([
        { json: "sunrise", js: "sunrise", typ: "" },
        { json: "sunset", js: "sunset", typ: "" },
        { json: "moonrise", js: "moonrise", typ: "" },
        { json: "moonset", js: "moonset", typ: "" },
        { json: "moon_phase", js: "moon_phase", typ: "" },
        { json: "moon_illumination", js: "moon_illumination", typ: "" },
    ], false),
    "Day": o([
        { json: "maxtemp_c", js: "maxtemp_c", typ: 3.14 },
        { json: "maxtemp_f", js: "maxtemp_f", typ: 3.14 },
        { json: "mintemp_c", js: "mintemp_c", typ: 3.14 },
        { json: "mintemp_f", js: "mintemp_f", typ: 3.14 },
        { json: "avgtemp_c", js: "avgtemp_c", typ: 3.14 },
        { json: "avgtemp_f", js: "avgtemp_f", typ: 3.14 },
        { json: "maxwind_mph", js: "maxwind_mph", typ: 3.14 },
        { json: "maxwind_kph", js: "maxwind_kph", typ: 3.14 },
        { json: "totalprecip_mm", js: "totalprecip_mm", typ: 3.14 },
        { json: "totalprecip_in", js: "totalprecip_in", typ: 3.14 },
        { json: "avgvis_km", js: "avgvis_km", typ: 3.14 },
        { json: "avgvis_miles", js: "avgvis_miles", typ: 0 },
        { json: "avghumidity", js: "avghumidity", typ: 0 },
        { json: "daily_will_it_rain", js: "daily_will_it_rain", typ: 0 },
        { json: "daily_chance_of_rain", js: "daily_chance_of_rain", typ: 0 },
        { json: "daily_will_it_snow", js: "daily_will_it_snow", typ: 0 },
        { json: "daily_chance_of_snow", js: "daily_chance_of_snow", typ: 0 },
        { json: "condition", js: "condition", typ: r("Condition") },
        { json: "uv", js: "uv", typ: 0 },
    ], false),
    "Hour": o([
        { json: "time_epoch", js: "time_epoch", typ: 0 },
        { json: "time", js: "time", typ: "" },
        { json: "temp_c", js: "temp_c", typ: 3.14 },
        { json: "temp_f", js: "temp_f", typ: 3.14 },
        { json: "is_day", js: "is_day", typ: 0 },
        { json: "condition", js: "condition", typ: r("Condition") },
        { json: "wind_mph", js: "wind_mph", typ: 3.14 },
        { json: "wind_kph", js: "wind_kph", typ: 3.14 },
        { json: "wind_degree", js: "wind_degree", typ: 0 },
        { json: "wind_dir", js: "wind_dir", typ: r("WindDir") },
        { json: "pressure_mb", js: "pressure_mb", typ: 0 },
        { json: "pressure_in", js: "pressure_in", typ: 3.14 },
        { json: "precip_mm", js: "precip_mm", typ: 3.14 },
        { json: "precip_in", js: "precip_in", typ: 3.14 },
        { json: "humidity", js: "humidity", typ: 0 },
        { json: "cloud", js: "cloud", typ: 0 },
        { json: "feelslike_c", js: "feelslike_c", typ: 3.14 },
        { json: "feelslike_f", js: "feelslike_f", typ: 3.14 },
        { json: "windchill_c", js: "windchill_c", typ: 3.14 },
        { json: "windchill_f", js: "windchill_f", typ: 3.14 },
        { json: "heatindex_c", js: "heatindex_c", typ: 3.14 },
        { json: "heatindex_f", js: "heatindex_f", typ: 3.14 },
        { json: "dewpoint_c", js: "dewpoint_c", typ: 3.14 },
        { json: "dewpoint_f", js: "dewpoint_f", typ: 3.14 },
        { json: "will_it_rain", js: "will_it_rain", typ: 0 },
        { json: "chance_of_rain", js: "chance_of_rain", typ: 0 },
        { json: "will_it_snow", js: "will_it_snow", typ: 0 },
        { json: "chance_of_snow", js: "chance_of_snow", typ: 0 },
        { json: "vis_km", js: "vis_km", typ: 0 },
        { json: "vis_miles", js: "vis_miles", typ: 0 },
        { json: "gust_mph", js: "gust_mph", typ: 3.14 },
        { json: "gust_kph", js: "gust_kph", typ: 3.14 },
        { json: "uv", js: "uv", typ: 0 },
    ], false),
    "Location": o([
        { json: "name", js: "name", typ: "" },
        { json: "region", js: "region", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "lat", js: "lat", typ: 3.14 },
        { json: "lon", js: "lon", typ: 3.14 },
        { json: "tz_id", js: "tz_id", typ: "" },
        { json: "localtime_epoch", js: "localtime_epoch", typ: 0 },
        { json: "localtime", js: "localtime", typ: "" },
    ], false),
    "WindDir": [
        "N",
        "NNW",
        "NW",
        "SSW",
        "SW",
        "W",
        "WNW",
        "WSW",
    ],
};
