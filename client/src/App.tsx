import React, { Suspense, lazy, useEffect } from 'react';

import { Container } from 'rsuite';
import styled from '@emotion/styled';
import './App.css';

import MyListIndicator from './components/Nav/MyListIndicator';
import SearchBox from './components/Search/SearchBox';
import CardList from './components/Media/CardList';

const StyledWrapper = styled(Container)`
    overflow-x: hidden;
    padding: 0;
    height: 100vh;
`;

const StyledContainer = styled.div`
    max-width: var(--content-width);
    margin: 0 auto;
`;

const MainWrapper: React.FC = ({ children, ...props }) => {
    return <StyledWrapper {...props}>{children}</StyledWrapper>;
};

function App() {
    return (
        <>
            <div className="container-fluid p-0 main-dark">
                <MainWrapper>
                    <MyListIndicator />
                    <StyledContainer>
                        <SearchBox />
                        <CardList />
                    </StyledContainer>
                </MainWrapper>
            </div>
        </>
    );
}

export default App;
