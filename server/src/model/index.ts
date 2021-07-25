export interface ISearchQuery {
    searchString: string;
    apiKey: string;
}

export type GifResponse = {
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
