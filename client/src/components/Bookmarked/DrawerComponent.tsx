import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonToolbar, Drawer, Placeholder } from 'rsuite';
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
    if (status === Status.Pending) {
        return (
            <div>
                <Paragraph />
            </div>
        );
    }

    // if (bookmarkError) {
    //     return (
    //         <div>
    //             <div>Oh no, there was a problem With your request</div>
    //             <pre> {JSON.stringify(bookmarkError, null, 2)}</pre>
    //         </div>
    //     );
    // }

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

                    {/* <Paragraph /> */}
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
