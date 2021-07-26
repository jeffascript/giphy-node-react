import * as React from 'react';

export interface IBookmarkProps {
    text: string;
}

const Bookmark = (props: IBookmarkProps) => {
    return (
        <div>
            <h1> Bookmark page</h1>
        </div>
    );
};

export default Bookmark;
