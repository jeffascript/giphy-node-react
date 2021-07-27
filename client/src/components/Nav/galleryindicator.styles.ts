import styled from '@emotion/styled';

export const StyledDiv = styled.div`
    background: var(--app-green);
    max-height: 6rem;
    width: 100%;
    padding: 2rem;
    margin: 0 auto;
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    align-content: center;
    color: var(--dark);
`;

export const StyledBookmarkContainer = styled.div`
    cursor: pointer;
    &:active,
    &:focus {
        outline: none;

        transform: scale(1.025);
    }

    &:hover {
        transform: scale(1.4);
        z-index: 10;
    }
`;
