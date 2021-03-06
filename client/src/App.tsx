import React from 'react';
import './App.css';
import GalleryIndicator from './components/Nav/GalleryIndicator';
import SearchBox from './components/Search/SearchBox';
import CardList from './components/Media/CardList';
import { SearchHookContextProvider } from './ContextAPI/SearchHookContext';
import { StyledContainer, StyledWrapper } from './App.styles';

const MainWrapper: React.FC = ({ children, ...props }) => {
    return <StyledWrapper {...props}>{children}</StyledWrapper>;
};

function App() {
    return (
        <>
            <SearchHookContextProvider>
                <div className="container-fluid p-0 main-dark">
                    <MainWrapper>
                        <GalleryIndicator />
                        <StyledContainer>
                            <SearchBox />
                            <CardList />
                        </StyledContainer>
                    </MainWrapper>
                </div>
            </SearchHookContextProvider>
        </>
    );
}

export default App;
