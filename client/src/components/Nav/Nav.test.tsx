/* eslint-disable no-irregular-whitespace */
import React from 'react';
import { render, screen, within, fireEvent, RenderResult, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../redux/store';
import NavPage from './GalleryIndicator';

afterEach(cleanup);

const renderApp = (): RenderResult =>
    render(
        <Provider store={store}>
            <NavPage />
        </Provider>,
    );

it('Matches Inline snapshot', () => {
    const { asFragment } = renderApp();
    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="css-10g4ob8"
          >
            <div
              class="css-1kvivmg"
            >
              <h2>
                Search For Your GIFS!!! 
              </h2>
              <div
                class="css-iavuzk"
              >
                <div
                  class="rs-badge none rs-badge-wrapper"
                >
                  <div>
                    <svg
                      fill="currentColor"
                      height="1em"
                      stroke="currentColor"
                      stroke-width="0"
                      style="font-size: 40px;"
                      viewBox="0 0 384 512"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"
                      />
                    </svg>
                  </div>
                  <div
                    class="rs-badge-content"
                  >
                    0
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div />
        </DocumentFragment>
    `);
});

test('renders the NavBar with Indicator', () => {
    const { asFragment, container } = renderApp();
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    const badge = container.querySelector('.rs-badge-content');
    expect(badge).toBeInTheDocument();
    expect(badge).not.toBeEmptyDOMElement();
    expect(badge?.nodeValue).toBeFalsy();
    expect(container.querySelector('.show-grid')).not.toBeInTheDocument();
});
