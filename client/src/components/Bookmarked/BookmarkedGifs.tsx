import React, { FC, useCallback } from 'react';
import { FaBookmark, FaLink } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'rsuite';
import ActionButton from '../Button/ActionButton';

import { removeBookmark } from '../../redux/bookmark.slice';
import { RootState } from '../../redux/store';
import { useClipboardCopyHook } from '../../hooks/useCopyClipboard';

interface IProps {
    url: string;
    id: string;
}

const BookmarkedGifs: FC<IProps> = ({ url, id }) => {
    const {
        allBookmarkState: { bookmarks, bookmarkError, LoadedCount, status },
    } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const [copyUrlStatus, copyUrl] = useClipboardCopyHook(url);

    const handleClipboardCopy = () => {
        copyUrl();
        Alert.success(
            <a href="https://markdown-it.github.io" target="_blank" rel="noopener noreferrer">
                GIF copied successfully!! Click here to test on a MarkDown file
            </a>,
            7000,
        );
    };

    const handleRemoveBookmark = useCallback((args: IProps) => {
        dispatch(removeBookmark(args));
        Alert.success('GIF successfully removed from Bookmarks!');
    }, []);
    return (
        <>
            <div className="col-4 mb-3">
                <img src={url} style={{ objectFit: 'cover', width: '80px', height: '45px' }} />
            </div>
            <div
                className="col-8 text-center mb-3 align-self-center"
                style={{ color: 'var(--dark)', fontWeight: 'bold' }}
            >
                <div className="container">
                    <div className="row">
                        <ActionButton className="col" onClick={handleClipboardCopy}>
                            <FaLink /> <br /> Copy
                        </ActionButton>

                        <ActionButton
                            className="col "
                            onClick={() => {
                                handleRemoveBookmark({ url, id });
                            }}
                        >
                            <FaBookmark /> <br /> UnBookmark
                        </ActionButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookmarkedGifs;
