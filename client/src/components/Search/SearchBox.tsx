import React, { useCallback, useState } from 'react';
import { useSearchContext } from '../../ContextAPI/SearchHookContext';
import { ActionType } from '../../ContextAPI/Actions.context';
import { Input } from './Input';

const SearchBox: React.FC = React.memo(() => {
    const { context, fetchWithHooks } = useSearchContext();

    const [state, setState] = useState<string>('');
    const [resultString, setResultString] = useState<string>('');

    const fetchGifs = useCallback(async (e: React.FormEvent | React.KeyboardEvent | any, data: string) => {
        e.preventDefault();
        if (!data) {
            return;
        }
        await fetchWithHooks(data);
        setResultString(data);
    }, []);

    const handleOnchange = useCallback((e: string) => {
        setState(e);
    }, []);

    const clearData = useCallback(() => {
        context.dispatch({ type: ActionType.Clear });
        setState('');
        setResultString('');
    }, []);

    return (
        <>
            <Input state={state} fetchGifs={fetchGifs} clearData={clearData} handleOnchange={handleOnchange} />
            {resultString && (
                <div
                    className="d-flex text-center justify-content-center align-items-center  mb-5"
                    data-testid="resultString"
                >
                    Result for: &nbsp; <h3 style={{ color: 'var(--app-green)', fontWeight: 'bold' }}>{resultString}</h3>
                </div>
            )}
        </>
    );
});

export default SearchBox;
