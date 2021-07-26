import React, { FC } from 'react';
import styled from '@emotion/styled';
import DATA from './data.json';
import Card from './Card';
// interface Props {

// }

const StyledContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: row;
    max-height: 100vh;
    padding: 2rem 0;
    margin: 0 auto;
    width: 100%;
`;

const StyledImg = styled.div`
    margin: 10px;
    border: 3px solid #000;
    box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.3);
    max-width: 23vw;
    transition: all 250ms;

    & > div > div.pointer {
        cursor: pointer;
        font-size: small;
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

        transform: scale(1.5);
        z-index: 10;

        p {
            transform: scale(0.75);
        }
    }
`;

const CardList: FC = (props) => {
    return (
        <>
            <StyledContainer>
                {DATA &&
                    DATA.length > 0 &&
                    DATA?.map(({ url }, index) => (
                        <React.Fragment key={index}>
                            <Card url={url} />
                        </React.Fragment>
                    ))}
            </StyledContainer>
        </>
    );
};

export default CardList;
