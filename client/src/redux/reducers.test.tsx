import { cleanup } from '@testing-library/react';
import store from './store';
import { addBookmarkSuccess, removeBookmark, addBookmark } from './bookmark.slice';

const url = 'http://fake.com';
const id = '12345abcd';

afterEach(cleanup);

test('Add Bookmark', () => {
    let state = store.getState().allBookmarkState;
    expect(state.bookmarks).toHaveLength(0);
    expect(state.LoadedCount).toBe(0);
    expect(state.status).toBe('idle');

    store.dispatch(addBookmarkSuccess({ url, id }));
    state = store.getState().allBookmarkState;
    expect(state.bookmarks).toHaveLength(1);
    expect(state.LoadedCount).toBe(1);
    expect(state.status).toBe('resolved');

    const newProfile = state.bookmarks[0];
    expect(newProfile).toMatchInlineSnapshot(`
        Object {
          "id": "12345abcd",
          "url": "http://fake.com",
        }
    `);

    expect(newProfile).toEqual({
        url,
        id,
    });
});

test('Re Add Book already added', () => {
    let state = store.getState().allBookmarkState;
    expect(state.bookmarks).toHaveLength(1);
    expect(state.LoadedCount).toBe(1);
    expect(state.status).toBe('resolved');

    store.dispatch(addBookmark({ url, id }));
    state = store.getState().allBookmarkState;
    expect(state.bookmarks).toHaveLength(1);
    expect(state.LoadedCount).toBe(1);

    const newProfile = state.bookmarks[0];
    expect(newProfile).toMatchInlineSnapshot(`
        Object {
          "id": "12345abcd",
          "url": "http://fake.com",
        }
    `);

    expect(newProfile).toEqual({ url, id });
});

test('Add Bookmark', () => {
    let state = store.getState().allBookmarkState;
    expect(state.bookmarks).toHaveLength(1);
    expect(state.LoadedCount).toBe(1);

    store.dispatch(removeBookmark({ url, id }));
    state = store.getState().allBookmarkState;
    expect(state.bookmarks).toHaveLength(0);
    expect(state.LoadedCount).toBe(0);

    const newProfile = state.bookmarks[0];
    expect(newProfile).toMatchInlineSnapshot(`undefined`);

    expect(newProfile).toEqual(undefined);
});
