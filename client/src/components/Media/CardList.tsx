import React, { FC } from 'react';
import styled from '@emotion/styled';

import { Col, FlexboxGrid, Grid, Row } from 'rsuite';
import DATA from './data.json';
import Card from './Card';
import { useSearchContext } from '../../ContextAPI/SearchHookContext';
import { Status } from '../../ContextAPI/types.context';
import Skeleton from '../Loaders/Skeleton';
// interface Props {

// }

const StyledContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    max-height: 100vh;
    padding: 2rem 0;
    margin: 0 auto;
    width: 100%;
`;

const MainContainer = styled.div`
    width: 100vw;
    max-width: var(--content-width);
    text-align: center;
`;

const CardList: FC = () => {
    const {
        context: {
            state: { status, gifResults, error },
        },
    } = useSearchContext();

    if (status === Status.Pending) {
        return (
            <div>
                <Skeleton />
            </div>
        );
    }
    if (status === Status.Idle) return null;

    if (status === Status.Rejected) {
        return (
            <div>
                <div>Oh no, there was a problem With your request</div>
                <pre> {JSON.stringify(error, null, 2)}</pre>
            </div>
        );
    }

    return (
        <>
            {/* <StyledContainer>
                {DATA &&
                    DATA.length > 0 &&
                    DATA?.map(({ url }, index) => (
                        <React.Fragment key={index}>
                            <Card url={url} />
                        </React.Fragment>
                    ))}
            </StyledContainer> */}

            <MainContainer className="show-grid">
                <FlexboxGrid justify="space-around">
                    {gifResults &&
                        gifResults.length > 0 &&
                        gifResults.map(({ url, id }) => (
                            // <React.Fragment key={index}>
                            //     <Card url={url} />
                            // </React.Fragment>
                            <FlexboxGrid.Item
                                key={id}
                                componentClass={Col}
                                colspan={10}
                                md={7}
                                sm={10}
                                lg={5}
                                xs={22}
                                xsOffset={2}
                                className="ml-0"
                            >
                                <Card url={url} id={id} />
                            </FlexboxGrid.Item>
                        ))}
                </FlexboxGrid>
            </MainContainer>

            {/* <div className="container-fluid">
                <div className="row  p-0 ">
                    {DATA &&
                        DATA.length > 0 &&
                        DATA?.map(({ url }, index) => (
                            // <React.Fragment key={index}>
                            //     <Card url={url} />
                            // </React.Fragment>
                            <div className="col-auto col-xs-12 col-md-6 text-center  m-auto p-2" key={index}>
                                <Card url={url} />
                            </div>
                        ))}
                </div>
            </div> */}
        </>
    );
};

// <div className="row  p-0 " style={{ color: "var(--colors-primary)" }}>
// {state && state.length > 0
//   ? state.map((oneArticle) => (
//       <div
//         className="col-auto col-xs-12 col-md-6 text-center  m-auto p-2"
//         key={oneArticle._id} //mx-1
//       >
//         {/* card should be here ---> pass the props for usage */}

//         <CardInfoHub
//           img={oneArticle.mainImg}
//           bgColor={generateRandomColor()}
//           headerText={oneArticle.mainTitle}
//           bodyText={oneArticle.mainDescription}
//           id={oneArticle._id}
//           scrollUp={scrollUp}
//           //  {...oneArticle }
//         />
//       </div>
//     ))
//   : // <p>nothing to show at the moment!</p>
//     null}
// </div>

export default CardList;
