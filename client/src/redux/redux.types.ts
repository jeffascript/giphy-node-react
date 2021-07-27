import { SerializedError } from '@reduxjs/toolkit';
import { Status } from '../ContextAPI/types.context';

export type Bookmark = {
    id: string;
    url: string;
};

export interface IBookmarkState {
    status: Status.Idle | Status.Resolved | Status.Rejected | Status.Pending;
    LoadedCount: number;
    bookmarks: Bookmark[];
    bookmarkError?: string | null | SerializedError;
}
