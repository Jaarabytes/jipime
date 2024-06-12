// helps in parsing cookies instead of sending them throughout the request body

import { IncomingHttpHeaders } from "http";
import { parse } from 'cookie'
export interface Cookies {
    [key: string] : string;
}

export function parseCookies(headers: IncomingHttpHeaders): Cookies {
    const cookies : Cookies = {};

    if ( headers && headers.cookie ) {
        const parsedCookies = parse(headers.cookie);
        for ( const [key, value] of Object.entries(parsedCookies) ) {
            cookies[key] = value;
        }
    }
    return cookies;
}
