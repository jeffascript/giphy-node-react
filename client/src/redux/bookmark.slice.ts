import { createSlice } from '@reduxjs/toolkit';
import { Bookmark, IBookmarkState } from './redux.types';
import { Status } from '../ContextAPI/types.context';
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */

import { AppDispatch, RootState } from './store';

export const addBookmark = ({ url, id }: Bookmark) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(bookmarkPending());

        const rootState = getState() as RootState;
        const found = rootState.allBookmarkState.bookmarks.some((el) => el.id === id);
        if (!found) {
            dispatch(addBookmarkSuccess({ url, id }));
        } else {
            dispatch(addBookmarkFailure('GiF Already Bookmarked'));
        }
    };
};

export const removeBookmark = ({ url, id }: Bookmark) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(bookmarkPending());
        const rootState = getState() as RootState;
        const found = rootState.allBookmarkState.bookmarks.some((el) => el.id === id);
        if (found) {
            dispatch(removeBookmarkSuccess({ url, id }));
        }
    };
};

const initialState = {
    LoadedCount: 0,
    bookmarks: [],
    bookmarkError: null,
    status: Status.Idle,
} as IBookmarkState;

// new Redux toolkit uses Immer, hence can be mutated  : cf: https://redux-toolkit.js.org/usage/immer-reducers
const bookmarkHandler = createSlice({
    name: 'allBookmarkState',
    initialState,
    reducers: {
        bookmarkPending: (state) => {
            state.status = Status.Pending;
            state.bookmarkError = null;
        },

        addBookmarkSuccess: (state, action) => {
            state.bookmarks.push(action.payload);
            state.LoadedCount += 1;
            state.status = Status.Resolved;
        },
        addBookmarkFailure: (state, action) => {
            if (action.payload) state.bookmarkError = action.payload;
            state.status = Status.Rejected;
        },

        removeBookmarkSuccess: (state, action) => {
            state.LoadedCount -= 1;
            state.status = Status.Resolved;
            state.bookmarks = state.bookmarks.filter((item) => item.id !== action.payload.id);
        },

        clearAllBookmarkData: (state) => {
            return {
                ...state,
                LoadedCount: 0,
                bookmarks: [],
                bookmarkError: null,
                status: Status.Idle,
            };
        },
    },
    //   extraReducers: () => {},
});

export const { addBookmarkFailure, addBookmarkSuccess, removeBookmarkSuccess, bookmarkPending, clearAllBookmarkData } =
    bookmarkHandler.actions;

export default bookmarkHandler.reducer;
