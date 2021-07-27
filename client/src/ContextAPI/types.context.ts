// eslint-disable-next-line no-shadow
export enum Status {
    Rejected = 'rejected',
    Idle = 'idle',
    Resolved = 'resolved',
    Pending = 'pending',
}

export type GifResults = {
    id: string;
    url: string;
    height: string;
    width: string;
};

export type InitialStateType = {
    status: string;
    gifResults: GifResults[];
    error: string | unknown | null;
};

export interface ICache {
    searchQuery: GifResults[];
}
