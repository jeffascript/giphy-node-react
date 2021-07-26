import React from 'react';
import { Icon, Input, InputGroup, Tooltip, Whisper } from 'rsuite';
import styled from '@emotion/styled';
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

const SearchBox: React.FC = (props) => {
    return (
        <FlexContainer>
            <Whisper
                trigger="focus"
                speaker={<Tooltip>Minimum of 3 letters Required</Tooltip>}
                placement={'bottomStart'}
            >
                <StyledInputGroup inside>
                    <StyledInput />
                    <InputGroup.Button>
                        <Icon icon="search" />
                    </InputGroup.Button>
                </StyledInputGroup>
            </Whisper>
        </FlexContainer>
    );
};

export default SearchBox;
