import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button, Drawer, Placeholder } from 'rsuite';
import { Status } from '../../ContextAPI/types.context';
import { RootState } from '../../redux/store';
import BookmarkedGifs from './BookmarkedGifs';

const { Paragraph } = Placeholder;
interface Props {
    show: boolean;
    toggleDrawer: () => void;
}

const DrawerComponent: FC<Props> = ({ show, toggleDrawer }) => {
    const {
        allBookmarkState: { bookmarks, bookmarkError, LoadedCount, status },
    } = useSelector((state: RootState) => state);

    if (status === Status.Pending) {
        return (
            <div>
                <Paragraph />
            </div>
        );
    }

    return (
        <div>
            <Drawer size={'xs'} placement={'right'} show={show} onHide={toggleDrawer}>
                <Drawer.Header>
                    <Drawer.Title>Bookmarks</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <div className="container overflow-auto">
                        <div className="row p-0 ">
                            {bookmarks && bookmarks.length > 0 ? (
                                bookmarks.map((oneBookmark) => (
                                    <React.Fragment key={oneBookmark.id}>
                                        <BookmarkedGifs {...oneBookmark} />
                                    </React.Fragment>
                                ))
                            ) : (
                                <h5 style={{ color: 'var(--dark)' }}>No GIFS Bookmarked</h5>
                            )}
                        </div>
                    </div>
                </Drawer.Body>
                <Drawer.Footer>
                    <Button onClick={toggleDrawer} style={{ background: 'var(--app-green)' }}>
                        Close
                    </Button>
                </Drawer.Footer>
            </Drawer>
        </div>
    );
};

export default DrawerComponent;
