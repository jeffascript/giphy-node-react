import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Input } from '../Input';

const changeHandler = jest.fn();
const clearDataHandler = jest.fn();
const fetchGifsHandler = jest.fn();

const state = 'hello';

test('renders the text input', () => {
    const { rerender, asFragment } = render(
        <Input
            state={state}
            fetchGifs={fetchGifsHandler}
            clearData={clearDataHandler}
            handleOnchange={changeHandler}
        />,
    );

    expect(asFragment()).toMatchSnapshot(`
<DocumentFragment>
    <div
    class="css-3l4gaw"
  >
    <div
      class="rs-input-group css-1fesyhj rs-input-group-inside"
    >
      <input
        class="rs-input css-1rxzna3 rs-input-lg"
        placeholder="Start typing ... e.g: happy"
        type="text"
        value="hello"
      />
      <a
        class="rs-btn rs-btn-default rs-input-group-btn"
      >
        <i
          class="rs-icon rs-icon-search"
        />
        <span
          class="rs-ripple-pond"
        >
          <span
            class="rs-ripple"
          />
        </span>
      </a>
    </div>
    <div
      class="d-flex text-center justify-content-center align-items-center m-auto"
      style="cursor: pointer;"
    >
        <svg
        fill="currentColor"
        height="22"
        stroke="currentColor"
        stroke-width="0"
        viewBox="0 0 16 16"
        width="22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 12.6l.7.7 1.6-1.6 1.6 1.6.8-.7L13 11l1.7-1.6-.8-.8-1.6 1.7-1.6-1.7-.7.8 1.6 1.6-1.6 1.6zM1 4h14V3H1v1zm0 3h14V6H1v1zm8 2.5V9H1v1h8v-.5zM9 13v-1H1v1h8z"
        />
      </svg>

      <span>
        reset
      </span>
    </div>
  </div>
</DocumentFragment>
`);
    const textInput = screen.getByRole('textbox');
    expect(textInput).toHaveValue(state);
    fireEvent.change(textInput, { target: { value: 'world' } });
    expect(changeHandler).toHaveBeenCalledWith('world');
    rerender(
        <Input
            state={'world'}
            fetchGifs={fetchGifsHandler}
            clearData={clearDataHandler}
            handleOnchange={changeHandler}
        />,
    );
    expect(textInput).toHaveValue('world');
});
