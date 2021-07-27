/* eslint-disable no-shadow */
import { GifResults } from './types.context';

const erroMsg = new Error('Search string should not be less than 3 characters');

export enum ActionType {
    Error = 'error',
    Success = 'success',
    Start = 'start',
    Clear = 'clear',
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

export interface Clear {
    type: ActionType.Clear;
}

export type SearchActions = Error | Success | Start | Clear;
