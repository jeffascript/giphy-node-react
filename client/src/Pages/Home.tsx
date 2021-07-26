import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';

export interface IHomeProps {
    text: string;
}

const Home = (props: IHomeProps) => {
    return (
        <div>
            <h1> Home</h1>
            <Link to="/bookmarked">
                <Button appearance="primary">Primary</Button>
            </Link>
        </div>
    );
};

export default Home;
