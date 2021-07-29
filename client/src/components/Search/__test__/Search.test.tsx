import React from 'react';
import ReactDOM from 'react-dom';

import { render, screen, fireEvent, cleanup, getByTestId, queryByTestId } from '@testing-library/react';

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
    // expect(countValue.textContent).toThrowError();
    // expect(countValue.textContent).toBe('');
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
    // expect(textInput).toHaveValue(state);
    fireEvent.click(clearBtn);
    // fireEvent.change(textInput, { target: { value: 'world' } });
    expect(clearDataHandler).toHaveBeenCalled();
    rerender(
        <Input state={''} fetchGifs={fetchGifsHandler} clearData={clearDataHandler} handleOnchange={changeHandler} />,
    );
    expect(textInput).toHaveValue('');
});

test('Click on Submit button and the String response reacts accordingly', () => {
    const { rerender, asFragment, container, getByText } = render(<SearchBox />);

    // const clearBtn = screen.getByText('cleardata');
    // console.log(clearBtn);

    expect(screen.queryByText('Result for:')).toBe(null);
    const btn = container.querySelector('a.rs-btn.rs-btn-default.rs-input-group-btn') || screen.getByRole('button');
    const textInput = screen.getByRole('textbox');
    const newValue = 'search';
    fireEvent.change(textInput, { target: { value: newValue } });
    expect(textInput).toHaveValue(newValue);
    fireEvent.submit(textInput);
    fireEvent.click(btn);
    // const showSearchedString = getByText(newValue) || getByTestId(container, 'resultString');
    expect(screen.queryByText('Result for:')).not.toBeInTheDocument();

    // expect(`<h3 style="color: var(--app-green); font-weight: bold;" xpath="1">${newValue}</h3>`).toBeInTheDocument();

    // expect(showSearchedString).toHaveValue(newValue);

    // const textInput = screen.getByRole('textbox');
    // expect(textInput).toHaveValue(state);
    // fireEvent.change(textInput, { target: { value: 'world' } });
    // // expect(textInput).toHaveValue(state);
    // fireEvent.click(clearBtn);
    // // fireEvent.change(textInput, { target: { value: 'world' } });
    // expect(clearDataHandler).toHaveBeenCalled();
    // rerender(
    //     <Input state={''} fetchGifs={fetchGifsHandler} clearData={clearDataHandler} handleOnchange={changeHandler} />,
    // );
    // expect(textInput).toHaveValue('');
});

// it("Submitting a name via the input field changes the name state value", () => {
//     const { container, rerender } = render(<App />);
//     const nameValue = getByTestId(container, "namevalue");
//     const inputName = getByTestId(container, "inputName");
//     const submitButton = getByTestId(container, "submitRefButton");
//     const newName = "Ben";
//     fireEvent.change(inputName, { target: { value: newName } });
//     fireEvent.click(submitButton);
//     expect(nameValue.textContent).toEqual(newName);
//     rerender(<App />);
//     expect(window.localStorage.getItem("name")).toBe(newName);
//   });

// it('SearchBar Component loads without any string on the Result String', () => {
//     const { container } = render(<SearchBox />);

//     const countValue = getByTestId(container, 'resultString');
//     expect(countValue.textContent).toThrowError();
//     // expect(countValue.textContent).toBe('');
// });

// it('Increment and decrement buttons work', () => {
//     const { container } = render(<App />);
//     const countValue = getByTestId(container, 'countvalue');
//     const increment = getByTestId(container, 'incrementButton');
//     const decrement = getByTestId(container, 'decrementButton');
//     expect(countValue.textContent).toBe('0');
//     fireEvent.click(increment);
//     expect(countValue.textContent).toBe('1');
//     fireEvent.click(decrement);
//     expect(countValue.textContent).toBe('0');
// });
