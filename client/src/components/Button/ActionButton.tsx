import React, { ReactNode } from 'react';

export interface ButtonProps {
    onClick?: () => void;
    children: ReactNode;
    className?: string;
}

const ActionButton: React.FC<ButtonProps> = (props) => {
    return (
        <div onClick={props.onClick} className={props.className} style={{ cursor: 'pointer' }}>
            {props.children}
        </div>
    );
};

export default ActionButton;
