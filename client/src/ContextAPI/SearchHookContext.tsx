import axios from 'axios';
import React, { createContext, ReactNode, useMemo, useReducer } from 'react';
import { ActionType, SearchActions } from './Actions.context';
import { InitialStateType } from './types.context';

interface IProps {
    searchQuery: string;
    children: ReactNode;
}

const initialState = {
    status: 'idle',
    gifResults: [],
    error: null,
};

export const SearchContext1 = createContext<InitialStateType>(initialState);

export const SearchContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<SearchActions>;
}>({
    state: initialState,
    dispatch: () => null,
});

/**
 * SEARCH REDUCER
 */

export function searchReducer(state: InitialStateType, action: SearchActions) {
    switch (action.type) {
        case ActionType.Error: {
            return {
                ...state,
                status: 'rejected',
                error: action.error,
            };
        }
        case ActionType.Success: {
            return {
                ...state,
                status: 'resolved',
                gifResults: action.payload,
            };
        }
        case ActionType.Start: {
            return {
                ...state,
                status: 'pending',
            };
        }

        case ActionType.Clear: {
            return {
                ...initialState,
            };
        }

        default: {
            throw new Error(`Unhandled action type`);
        }
    }
}

const SearchHookContextProvider = (props: Partial<IProps>) => {
    const [state, dispatch] = useReducer(searchReducer, initialState);

    return (
        <SearchContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {props.children}
        </SearchContext.Provider>
    );
};

/**
 * USE SEARCH CONTEXT HOOK
 */
const useSearchContext = () => {
    const context = React.useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider');
    }
    const cache = new Map(); // for temporary cache storage and memoise the function to retain the data
    const fetchWithHooks = useMemo(
        () => async (searchQuery: string) => {
            // eslint-disable-next-line no-console
            const url =
                process.env.NODE_ENV === 'production'
                    ? `${process.env.REACT_APP_BASE_URL}/api/gifs`
                    : 'http://localhost:5001/api/gifs';

            if (searchQuery.length < 3) {
                context.dispatch({
                    type: ActionType.Error,
                    error: new Error('Search string should not be less than 3 characters'),
                });
                return;
            }

            context.dispatch({ type: ActionType.Start });
            if (cache.has(searchQuery)) {
                const data = cache.get(searchQuery);
                // eslint-disable-next-line no-console
                console.log('cache gotten DATA', data);
                context.dispatch({ type: ActionType.Success, payload: data });
            } else {
                try {
                    const dataInput = {
                        searchString: searchQuery,
                    };

                    const response = await axios.post(url, dataInput);
                    // eslint-disable-next-line no-console
                    console.log('fetching DATA', response);
                    const data = await response.data;
                    cache.set(searchQuery, data);

                    context.dispatch({ type: ActionType.Success, payload: data });
                } catch (error) {
                    context.dispatch({ type: ActionType.Error, error: error.message });
                }
            }
        },
        [],
    );

    return { fetchWithHooks, context };
};

export { useSearchContext, SearchHookContextProvider };
