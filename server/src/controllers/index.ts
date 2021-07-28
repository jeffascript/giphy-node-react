/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { GifResponse, ISearchQuery, IError, APIFetchResponse } from '../model';
import FetchRequest from '../utils/axios';
import { redisClient, cacheExpiration } from '../utils/redis';

interface ISearch {
    fetchGifs({ searchString, apiKey }: ISearchQuery): Promise<IError | GifResponse[] | any>;
}

class SearchController implements ISearch {
    private formatResult(dataArr: APIFetchResponse): GifResponse[] {
        const data = dataArr.data.map((datum) => ({
            id: datum.id,
            ...datum.images.downsized_medium,
        }));
        return data as GifResponse[];
    }

    public async fetchGifs({ searchString, apiKey }: ISearchQuery): Promise<IError | GifResponse[] | any> {
        const data = await FetchRequest.searchWithParams({ searchString, apiKey });
        if (data.errCode) {
            return data as IError;
        }
        const formattedResp = this.formatResult(data as APIFetchResponse);
        const cacheKey = JSON.stringify(searchString);
        redisClient.set(cacheKey, JSON.stringify(formattedResp), 'EX', cacheExpiration);
        return formattedResp;
    }
}

export default new SearchController();
