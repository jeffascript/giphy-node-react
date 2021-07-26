import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaBookmark, FaLink } from 'react-icons/fa';
import ActionButton from '../Button/ActionButton';

const StyledImgContainer = styled.div`
    margin: 10px;
    border: 3px solid #000;
    box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.3);
    max-width: 23vw;
    /* max-width: 100%; */
    transition: all 250ms;
    position: relative;

    @media ${`only screen and (max-width: 561px)`} {
        max-width: 50vw;
        width: 100%;
        /* max-width: 100vw;
        flex: 1;
        margin: 0 auto; */
        /* flex: 0 0 auto; */
        /* width: auto; */
        /* max-width: none; */
    }

    @media ${`only screen and (max-width: 401px)`} {
        max-width: 100vw;
    }

    & > div > div.pointer {
        cursor: pointer;
        font-size: small;
        padding: 0.3rem 1rem;
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

    & div.hovered {
        position: absolute;
        top: 20;
        /* top: 0; */
        left: 20;
        left: 20%;
        top: 40%;
        background: black;
        width: 100%;
        transform: translate(-20%, 0%);
    }

    /* & img {
        min-height: 70%;
        height: 80%;
        min-width: 100%;
        object-fit: cover;
    } */
    & img {
        @media ${`only screen and (max-width: 561px)`} {
            width: 250px;
            /* width: 150px;
            flex: 1;
            /* flex: 0 0 auto; */
            /* width: auto; */
            /* max-width: none; */
        }
    }
`;

const StyledHoverWrapper = styled.div`
    position: absolute;
    top: 20;
    /* top: 0; */
    left: 20;
    left: 20%;
    top: 40%;
    background: black;
    width: 100%;
    transform: translate(-20%, 0%);
`;

const StyledContainer = styled.div`
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

interface Props {
    url: string;
}

const Card: React.FC<Props> = (props) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const onMouseEnter = (e: React.MouseEvent) => {
        setHovered(true);
    };

    const onMouseLeave = (e: React.MouseEvent) => {
        setHovered(false);
    };

    return (
        <>
            {/* <div
                className="  my-2"
                style={{
                    // minWidth: '242px',
                    height: '93px',
                }}
            >
                <img src={url} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />

            </div> */}

            <StyledContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <img src={props.url} />
                <div className={hovered ? `d-flex justify-content-center align-items-center hovered` : `d-none`}>
                    <ActionButton className="copy ">
                        co
                        <FaLink />y
                    </ActionButton>

                    <ActionButton className="bookmark">
                        Bookm
                        <FaBookmark />
                        rk
                    </ActionButton>
                </div>
            </StyledContainer>
        </>
    );
};

export default Card;