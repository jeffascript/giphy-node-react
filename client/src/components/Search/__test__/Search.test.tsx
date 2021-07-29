/* eslint-disable no-irregular-whitespace */
import React from 'react';
import ReactDOM from 'react-dom';

import { render, screen, fireEvent, cleanup, getByTestId, queryByTestId, waitFor } from '@testing-library/react';

import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBox from '../SearchBox';
import { Input } from '../Input';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchBox />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('SearchBar Component loads without any string on the Result String', () => {
    const wrapper = shallow(<SearchBox />);
    const text = wrapper.find({ prop: 'data-testid' }).first();
    expect(text).toMatchObject({});
});

afterEach(cleanup);

it('SearchBar Component loads without any string on the Result String', () => {
    const { container } = render(<SearchBox />);
    const input = screen.getByRole('textbox');
    expect(input.textContent).toEqual('');
});

const changeHandler = jest.fn();
const clearDataHandler = jest.fn();
const fetchGifsHandler = jest.fn();

const state = 'hello';

test('Data input can be cleared', () => {
    const { rerender, asFragment, container, getByText } = render(
        <Input
            state={state}
            fetchGifs={fetchGifsHandler}
            clearData={clearDataHandler}
            handleOnchange={changeHandler}
        />,
    );

    const clearBtn = screen.getByText('reset');

    const textInput = screen.getByRole('textbox');
    expect(textInput).toHaveValue(state);
    fireEvent.change(textInput, { target: { value: 'world' } });

    fireEvent.click(clearBtn);

    expect(clearDataHandler).toHaveBeenCalled();
    rerender(
        <Input state={''} fetchGifs={fetchGifsHandler} clearData={clearDataHandler} handleOnchange={changeHandler} />,
    );
    expect(textInput).toHaveValue('');
});

it('Matches Inline snapshot', () => {
    const { rerender, asFragment, container, getByText } = render(<SearchBox />);
    expect(asFragment()).toMatchInlineSnapshot(`
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
                value=""
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
});

test('Click on Submit button and the String response reacts accordingly', async () => {
    const { rerender, asFragment, container, getByText } = render(<SearchBox />);

    expect(screen.queryByText('Result for:')).toBe(null);
    const btn = container.querySelector('a.rs-btn.rs-btn-default.rs-input-group-btn') || screen.getByRole('button');
    const textInput = screen.getByRole('textbox');
    const newValue = 'search';
    fireEvent.change(textInput, { target: { value: newValue } });
    expect(textInput).toHaveValue(newValue);
    fireEvent.submit(textInput);
    fireEvent.click(btn);
    rerender(<SearchBox />);

    expect(screen.queryByText('Result for:')).not.toBeInTheDocument();
    await waitFor(() => {
        expect(screen.queryByText('Result for:')).not.toBeInTheDocument();
    });
});

it('renders < SearchBox/> without crashing  ', () => {
    const { container } = render(<SearchBox />);
    const searchPlaceholder = 'Start typing ... e.g: happy';

    expect(screen.getAllByRole('textbox')).toHaveLength(1);
});

it('Matches snapshot', () => {
    const tree = renderer.create(<SearchBox />);
    expect(tree).toMatchSnapshot();
});
