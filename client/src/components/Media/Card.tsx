import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaBookmark, FaLink } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'rsuite';
import ActionButton from '../Button/ActionButton';
import { addBookmark } from '../../redux/bookmark.slice';
import { RootState } from '../../redux/store';
import { CopyStatusEnum, useClipboardCopyHook } from '../../hooks/useCopyClipboard';

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

interface ICardProps {
    url: string;
    id: string;
}

const Card: React.FC<ICardProps> = (props) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const {
        allBookmarkState: { bookmarks, bookmarkError, LoadedCount, status },
    } = useSelector((state: RootState) => state);

    const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
    const [copyUrlStatus, copyUrl] = useClipboardCopyHook(props?.url);

    useEffect(() => {
        setBookmarkedIds(bookmarks.map((gif) => gif.id));
    }, [LoadedCount]);

    const dispatch = useDispatch();

    const onMouseEnter = (e: React.MouseEvent) => {
        setHovered(true);
    };

    const onMouseLeave = (e: React.MouseEvent) => {
        setHovered(false);
    };

    const handleBookmarkUIBehavior = (id: string) => {
        const found = bookmarkedIds.some((el) => el === id);
        if (found) {
            Alert.error((bookmarkError as string) ?? 'GIF Already Bookmarked');
        } else {
            Alert.success('GIF Bookmarked successfully!');
        }
    };

    const handleAddBookmark = (args: ICardProps) => {
        dispatch(addBookmark(args));
        setBookmarkedIds([...bookmarkedIds, args.id]);
        handleBookmarkUIBehavior(args.id);
    };

    const handleClipboardCopy = () => {
        copyUrl();
        Alert.success(
            <a href="https://markdown-it.github.io" target="_blank" rel="noopener noreferrer">
                GIF copied successfully!! Click here to test on a MarkDown file
            </a>,
            7000,
        );
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
                    <ActionButton className="copy " onClick={handleClipboardCopy}>
                        co
                        <FaLink />y
                    </ActionButton>

                    <ActionButton className="bookmark" onClick={() => handleAddBookmark(props)}>
                        Bookm
                        <FaBookmark />
                        rk
                    </ActionButton>
                </div>

                {}
            </StyledContainer>
        </>
    );
};

export default Card;
