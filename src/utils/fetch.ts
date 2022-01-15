import { ApiRequestConfig, } from "types/api";
import axios from "axios";
import {TIMEOUT, VITE_API_URL} from "config";

export async function fetchApi<T = any>(config: ApiRequestConfig): Promise<T> {
    try {
        const resp = await axios({
            baseURL: VITE_API_URL,
            url: config.path,
            params: config.query,
            method: config.method,
            headers: {
                ...config.headers,
                "Access-Control-Allow-Origin": "*",
            },
            data: config.body,
            timeout: TIMEOUT,
            withCredentials: false,
            responseType: "json",
        });
        return resp.data;
    } catch (e) {
       throw e
    }
}