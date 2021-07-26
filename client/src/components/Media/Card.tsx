import React from 'react';
import styled from '@emotion/styled';
import { FaBookmark, FaLink } from 'react-icons/fa';

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

interface Props {
    url: string;
}

const Card: React.FC<Props> = (props) => {
    return (
        <>
            <StyledImg>
                <img src={props.url} width={150} height={120} />
                <div className="d-flex justify-content-end align-items-center">
                    <div className="pointer ">
                        <FaLink />
                    </div>
                    <div className="pointer">
                        <FaBookmark />
                    </div>
                </div>
            </StyledImg>
        </>
    );
};

export default Card;
