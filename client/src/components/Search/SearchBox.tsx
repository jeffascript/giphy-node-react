import React, { useCallback, useState } from 'react';
import { Icon, InputGroup, Tooltip, Whisper } from 'rsuite';
import { VscClearAll } from 'react-icons/vsc';
import { useSearchContext } from '../../ContextAPI/SearchHookContext';

import ActionButton from '../Button/ActionButton';
import { FlexContainer, StyledInputGroup, StyledInput } from './searchbox.styles';
import { ActionType } from '../../ContextAPI/Actions.context';

const SearchBox: React.FC = React.memo(() => {
    const { context, fetchWithHooks } = useSearchContext();

    const [state, setState] = useState<string>('');
    const [resultString, setResultString] = useState<string>('');

    const fetchGifs = async () => {
        fetchWithHooks(state);
        setResultString(state);
    };

    const clearData = useCallback(() => {
        context.dispatch({ type: ActionType.Clear });
        setState('');
        setResultString('');
    }, []);

    return (
        <>
            <FlexContainer>
                <Whisper
                    trigger="focus"
                    speaker={<Tooltip>{state.length < 2 ? 'Minimum of 3 letters Required' : null}</Tooltip>}
                    placement={'bottomStart'}
                >
                    <StyledInputGroup inside={true}>
                        <StyledInput
                            onChange={(e) => setState(e)}
                            value={state}
                            onPressEnter={fetchGifs}
                            size={'lg'}
                            placeholder={'Start typing ... e.g: happy'}
                        />
                        <InputGroup.Button onClick={fetchGifs}>
                            <Icon icon="search" />
                        </InputGroup.Button>
                    </StyledInputGroup>
                </Whisper>
                <ActionButton
                    className="d-flex text-center justify-content-center align-items-center m-auto"
                    onClick={clearData}
                >
                    <VscClearAll size={22} /> &nbsp; <span>reset</span>
                </ActionButton>
            </FlexContainer>
            {resultString && (
                <div className="d-flex text-center justify-content-center align-items-center  mb-5">
                    Result for: &nbsp; <h3 style={{ color: 'var(--app-green)', fontWeight: 'bold' }}>{resultString}</h3>
                </div>
            )}
        </>
    );
});

export default SearchBox;
