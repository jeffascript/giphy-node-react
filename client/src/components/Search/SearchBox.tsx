import React, { useCallback, useState } from 'react';
import { Icon, Input, InputGroup, Tooltip, Whisper } from 'rsuite';
import styled from '@emotion/styled';
import { VscClearAll } from 'react-icons/vsc';
import { useSearchContext } from '../../ContextAPI/SearchHookContext';
import { ActionType } from '../../ContextAPI/Actions.context';
import ActionButton from '../Button/ActionButton';
// interface Props {}

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1rem;
    margin: 0 auto;
`;

const StyledInputGroup = styled(InputGroup)`
    margin-bottom: 10px;
    margin: 2rem;
`;

const StyledInput = styled(Input)`
    /* border-radius: 50px;
    padding: 0.8rem; */
    border-radius: 12px;
`;

// const StyledIcon = styled(Icon)`
//     /* padding: 1rem;
//     margin-top: 0.4rem;
//     &:hover,
//     &:focus {
//         padding: 0.5rem 1.3rem;
//         margin: 0.3rem 1rem;
//         background: transparent;
//     } */
// `;

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

    // eslint-disable-next-line no-console
    console.log('context state', context.state);

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
