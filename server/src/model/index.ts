import { APIResponse } from './apiResponse';

export interface ISearchQuery {
    searchString: string;
    apiKey: string;
}

export type GifResponse = {
    id: string;
    height: string;
    width: string;
    size: string;
    url: string;
};

export type StringObject = {
    [key: string]: string;
};

export interface IError {
    errCode: number;
    message?: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface APIFetchResponse extends APIResponse {}
