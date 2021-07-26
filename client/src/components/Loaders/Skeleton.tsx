import React from 'react';
import { Loader, Placeholder } from 'rsuite';

const Skeleton: React.FC = () => {
    return (
        <React.Fragment>
            <Placeholder.Grid rows={5} columns={6} active>
                <Loader backdrop content="loading..." vertical />
            </Placeholder.Grid>
        </React.Fragment>
    );
};

export default Skeleton;
