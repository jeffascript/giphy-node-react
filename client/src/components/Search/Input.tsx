import React from 'react';
import { Icon, InputGroup, Tooltip, Whisper } from 'rsuite';
import { VscClearAll } from 'react-icons/vsc';
import ActionButton from '../Button/ActionButton';
import { FlexContainer, StyledInputGroup, StyledInput } from './searchbox.styles';

interface Input {
    state: string;
    handleOnchange: (e: string) => void;
    fetchGifs: (e: any, data: string) => void;
    clearData: () => void;
}

export const Input: React.FC<Input> = ({ state, handleOnchange, fetchGifs, clearData }) => {
    return (
        <>
            <FlexContainer>
                <Whisper
                    trigger="focus"
                    speaker={<Tooltip>{state?.length < 2 ? 'Minimum of 3 letters Required' : null}</Tooltip>}
                    placement={'bottomStart'}
                >
                    <StyledInputGroup inside={true}>
                        <StyledInput
                            onChange={(e) => handleOnchange(e)}
                            value={state}
                            onPressEnter={(e) => fetchGifs(e, state)}
                            size={'lg'}
                            placeholder={'Start typing ... e.g: happy'}
                        />
                        <InputGroup.Button onClick={(e) => fetchGifs(e, state)}>
                            <Icon icon="search" />
                        </InputGroup.Button>
                    </StyledInputGroup>
                </Whisper>
                <ActionButton
                    className="d-flex text-center justify-content-center align-items-center m-auto"
                    onClick={clearData}
                    data-testid="cleardata"
                >
                    <VscClearAll size={22} /> &nbsp; <span>reset</span>
                </ActionButton>
            </FlexContainer>
        </>
    );
};
