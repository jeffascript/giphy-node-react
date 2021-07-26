import React, { FC, useState } from 'react';
import { FaBookmark, FaLink } from 'react-icons/fa';
import { Button, ButtonToolbar, Drawer, Placeholder } from 'rsuite';
import ActionButton from '../Button/ActionButton';
import DATA from '../Media/data.json';

const { Paragraph } = Placeholder;
// interface Props {
//     show: boolean;
//     toggleDrawer: () => void;
// }

const BookmarkedGifs: FC = (props) => {
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

    return (
        <>
            <div className="container overflow-auto">
                <div className="row p-0 ">
                    {DATA && DATA.length > 0 ? (
                        DATA.map(({ url }, index) => (
                            <React.Fragment key={index}>
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

                                            <ActionButton className="col ">
                                                <FaBookmark /> <br /> UnBookmark
                                            </ActionButton>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))
                    ) : (
                        <h5 style={{ color: 'var(--dark)' }}>No GIFS Bookmarked</h5>
                    )}
                </div>
            </div>
        </>
    );
};

export default BookmarkedGifs;
