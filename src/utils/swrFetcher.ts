import { fetchApi } from "./fetch";

const swrFetcher = async (key: string, data?: Record<any, any>) => {
    return fetchApi({
        path: key,
        query: data,
    }).catch((e) => {
        throw e
    });
};

export default swrFetcher;