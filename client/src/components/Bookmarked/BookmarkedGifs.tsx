import React, { FC, useCallback, useState } from 'react';
import { FaBookmark, FaLink } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, ButtonToolbar, Drawer, Placeholder } from 'rsuite';
import { GifResults, Status } from '../../ContextAPI/types.context';
import ActionButton from '../Button/ActionButton';

import { removeBookmark } from '../../redux/bookmark.slice';
import { RootState } from '../../redux/store';

const { Paragraph } = Placeholder;
interface IProps {
    // show: boolean;
    // toggleDrawer: () => void;
    // savedGifs: Partial<GifResults>;
    url: string;
    id: string;
}

const BookmarkedGifs: FC<IProps> = ({ url, id }) => {
    const {
        allBookmarkState: { bookmarks, bookmarkError, LoadedCount, status },
    } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    // const initialState = {
    //     show: false,
    // };
    // const [state, setState] = useState(initialState);

    // const close = () => {
    //     setState({ ...state, show: false });
    // };
    // const toggleDrawer = () => {
    //     setState({ ...state, show: true });
    // };
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
                className="col-8   text-center mb-3 align-self-center"
                style={{ color: 'var(--dark)', fontWeight: 'bold' }}
            >
                <div className="container">
                    <div className="row">
                        <ActionButton className="col ">
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
