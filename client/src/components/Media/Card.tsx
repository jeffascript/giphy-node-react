import React, { useEffect, useState } from 'react';
import { FaBookmark, FaLink } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'rsuite';
import ActionButton from '../Button/ActionButton';
import { addBookmark } from '../../redux/bookmark.slice';
import { RootState } from '../../redux/store';
import { useClipboardCopyHook } from '../../hooks/useCopyClipboard';
import { StyledContainer } from './cards.styles';

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
            </StyledContainer>
        </>
    );
};

export default Card;
