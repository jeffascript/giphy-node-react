import React, { FC, useCallback, useState } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Badge } from 'rsuite';
import { useSelector } from 'react-redux';
import DrawerComponent from '../Bookmarked/DrawerComponent';
import { RootState } from '../../redux/store';
import { Status } from '../../ContextAPI/types.context';
import { StyledDiv, FlexContainer, StyledBookmarkContainer } from './galleryindicator.styles';

const MyListIndicator: FC = () => {
    const [toggle, setToggled] = useState<boolean>(false);

    const {
        allBookmarkState: { bookmarks, bookmarkError, LoadedCount, status },
    } = useSelector((state: RootState) => state);

    const openModal = useCallback(() => {
        setToggled(!toggle);
    }, [toggle]);

    return (
        <>
            <StyledDiv>
                <FlexContainer>
                    <h2>Search For your GIFS!!! </h2>
                    <StyledBookmarkContainer onClick={openModal}>
                        <Badge content={LoadedCount ?? 0} className={status === Status.Pending ? `blink_me` : `none`}>
                            <IconContext.Provider value={{ style: { fontSize: '40px', color: 'var(--dark)' } }}>
                                <div>
                                    <FaBookmark />
                                </div>
                            </IconContext.Provider>
                        </Badge>
                    </StyledBookmarkContainer>
                </FlexContainer>
            </StyledDiv>

            <DrawerComponent show={toggle} toggleDrawer={openModal} />
        </>
    );
};

export default MyListIndicator;
