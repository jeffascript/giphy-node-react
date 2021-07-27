import styled from '@emotion/styled';

export const StyledContainer = styled.div`
    border: 3px solid #000;
    box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.3);
    transition: all 250ms;
    position: relative;
    height: 93px;
    margin-bottom: 0.9rem;

    & > div > div.copy,
    & > div > div.bookmark {
        cursor: pointer;
        font-size: small;
        padding: 0.3rem 1rem;
        color: var(--dark);
        font-weight: 600;
    }

    & > div > div.bookmark {
        color: white; //var(--dark)
    }

    p {
        transition: all 250ms;
    }

    &:active,
    &:focus {
        outline: none;

        transform: scale(1.025);
    }

    &:hover {
        background: var(--dark);

        transform: scale(1.1);
        z-index: 10;

        p {
            transform: scale(0.75);
        }
    }

    & div.hovered {
        position: absolute;
        top: 20;
        /* top: 0; */
        left: 20;
        left: 20%;
        top: 40%;
        background: var(--app-green-darker);
        width: 100%;
        transform: translate(-20%, 0%);
    }

    & img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`;

export const MainContainer = styled.div`
    width: 100vw;
    max-width: var(--content-width);
    text-align: center;
`;
