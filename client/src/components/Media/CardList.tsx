import React, { FC } from 'react';
import { Col, FlexboxGrid } from 'rsuite';
import Card from './Card';
import { useSearchContext } from '../../ContextAPI/SearchHookContext';
import { Status } from '../../ContextAPI/types.context';
import Skeleton from '../Loaders/Skeleton';
import { MainContainer } from './cards.styles';

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
                <div>{error as string}</div>
                <pre> {JSON.stringify(error, null, 2)}</pre>
            </div>
        );
    }

    return (
        <>
            <MainContainer className="show-grid">
                <FlexboxGrid justify="space-around">
                    {gifResults && gifResults.length > 0 ? (
                        gifResults.map(({ url, id }) => (
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
                        ))
                    ) : (
                        <h5 style={{ color: 'var(--app-green)' }}>No GIF To Show</h5>
                    )}
                </FlexboxGrid>
            </MainContainer>
        </>
    );
};

export default CardList;
