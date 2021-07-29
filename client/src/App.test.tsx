/* eslint-disable no-irregular-whitespace */
import React from 'react';
import { render, screen, RenderResult, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from './redux/store';
import App from './App';

afterEach(cleanup);

const renderApp = (): RenderResult =>
    render(
        <Provider store={store}>
            <App />
        </Provider>,
    );

test('renders the App', () => {
    const { asFragment, container } = renderApp();
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Search For Your GIFS!!!')).toBeInTheDocument();
    expect(container.querySelector('.rs-badge-content')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(container.querySelector('.show-grid')).not.toBeInTheDocument();
});

it('Matches Inline snapshot', () => {
    const { asFragment } = renderApp();

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="container-fluid p-0 main-dark"
          >
            <div
              class="rs-container css-160iovx"
            >
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
              <div
                class="css-1xzcigu"
              >
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
              </div>
            </div>
          </div>
        </DocumentFragment>
    `);
});
