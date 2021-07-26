/* eslint-disable no-shadow */
import { GifResults } from './State.types';

const erroMsg = new Error('Search string should not be less than 3 characters');

export enum ActionType {
    Error = 'error',
    Success = 'success',
    Start = 'start',
}

export interface Error {
    type: ActionType.Error;
    error: typeof erroMsg;
}

export interface Success {
    type: ActionType.Success;
    payload: GifResults[];
}

export interface Start {
    type: ActionType.Start;
}

export type SearchActions = Error | Success | Start;
