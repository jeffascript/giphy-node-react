import React, { FC, useState } from 'react';
import { Button, ButtonToolbar, Drawer, Placeholder } from 'rsuite';

const { Paragraph } = Placeholder;
interface Props {
    show: boolean;
    toggleDrawer: () => void;
}

const DrawerComponent: FC<Props> = ({ show, toggleDrawer }) => {
    // const initialState = {
    //     show: false,
    // };
    // const [state, setState] = useState(initialState);

    // const close = () => {
    //     setState({ ...state, show: false });
    // };
    // const toggleDrawer = () => {
    //     setState({ ...state, show: true });
    // };

    return (
        <div>
            <Drawer size={'xs'} placement={'right'} show={show} onHide={toggleDrawer}>
                <Drawer.Header>
                    <Drawer.Title>Drawer Title</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <Paragraph />
                </Drawer.Body>
                <Drawer.Footer>
                    <Button onClick={toggleDrawer} style={{ background: 'var(--app-green)' }}>
                        Close
                    </Button>
                </Drawer.Footer>
            </Drawer>
        </div>
    );
};

export default DrawerComponent;
