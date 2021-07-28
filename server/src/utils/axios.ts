import axios, { AxiosResponse, AxiosError } from 'axios';
import { ISearchQuery, IError, APIFetchResponse } from '../model';

class FetchRequest {
    static async searchWithParams({ searchString, apiKey }: ISearchQuery): Promise<any> {
        const url = `https://api.giphy.com/v1/gifs/search?q=${searchString}&api_key=${apiKey}`;
        const fetchJson = await axios
            .get(url)
            .then((response: AxiosResponse) => response.data as APIFetchResponse)
            .catch((error: AxiosError) => {
                if (error.response) {
                    return { errCode: error.response.status, ...error.response.data } as IError;
                }
            });

        return fetchJson;
    }
}

export default FetchRequest;
