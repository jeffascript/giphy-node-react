import React from 'react';
import { Loader, Placeholder } from 'rsuite';

const Skeleton: React.FC = () => {
    return (
        <React.Fragment>
            <Placeholder.Grid rows={10} columns={7} active rowHeight={10} rowMargin={20}>
                <Loader backdrop content="loading..." vertical />
            </Placeholder.Grid>
        </React.Fragment>
    );
};

export default Skeleton;
