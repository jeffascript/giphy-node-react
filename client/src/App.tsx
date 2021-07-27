import React from 'react';
import './App.css';
import MyListIndicator from './components/Nav/MyListIndicator';
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
                        <MyListIndicator />
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
