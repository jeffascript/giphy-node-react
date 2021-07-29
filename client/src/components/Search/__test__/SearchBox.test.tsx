import React from 'react';

import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import renderer from 'react-test-renderer';

import SearchBox from '../SearchBox';

afterEach(cleanup);

it('renders < SearchBox/> without crashing  ', () => {
    const { container } = render(<SearchBox />);
    const searchPlaceholder = 'Start typing ... e.g: happy';
    // expect(container.textContent).toContain('Minimum of 3 letters Required');
    // expect(screen.getByText(/Minimum/i)).toBeVisible();
    // expect(screen.getByPlaceholderText(/Minimum/i)).toHaveDisplayValue(searchPlaceholder);
    expect(screen.getAllByRole('textbox')).toHaveLength(1);

    // expect(screen.getByRole('textbox')).toContain({ placeholder: searchPlaceholder });
});

it('Matches snapshot', () => {
    const tree = renderer.create(<SearchBox />);
    expect(tree).toMatchSnapshot();
});
