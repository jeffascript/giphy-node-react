import React, { FC, useCallback, useState } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import styled from '@emotion/styled';
import { Badge } from 'rsuite';
import { useSelector } from 'react-redux';
import DrawerComponent from '../Bookmarked/DrawerComponent';
import { RootState } from '../../redux/store';
import { Status } from '../../ContextAPI/types.context';

const StyledDiv = styled.div`
    background: var(--app-green);
    max-height: 6rem;
    width: 100%;
    padding: 2rem;
    margin: 0 auto;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    align-content: center;
    color: var(--dark);
`;

const StyledBookmarkContainer = styled.div`
    cursor: pointer;
    &:active,
    &:focus {
        // $focus-height: $item-height * 1.01;
        outline: none;
        // height: $focus-height;
        // margin: (($focus-height - $item-height) / 2) * -1;
        transform: scale(1.025);
    }

    &:hover {
        // $hover-height: $item-height * 1.5;
        /* background: var(--dark); */
        // height: $hover-height;
        // margin: (($hover-height - $item-height) / 2) * -1;
        // flex-grow: 2;
        transform: scale(1.4);
        z-index: 10;
    }
`;

// interface Props {}

const MyListIndicator: FC = (props) => {
    const [toggle, setToggled] = useState<boolean>(false);

    const {
        allBookmarkState: { bookmarks, bookmarkError, LoadedCount, status },
    } = useSelector((state: RootState) => state);

    const openModal = useCallback(() => {
        setToggled(!toggle);
    }, [toggle]);

    return (
        <>
            {/* <ButtonToolbar>
                <Button onClick={toggleDrawer}>Open</Button>
            </ButtonToolbar> */}
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
