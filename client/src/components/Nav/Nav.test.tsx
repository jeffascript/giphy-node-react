import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ServiceListingScreen from './GalleryIndicator';
import serviceReducer from '../../redux/bookmark.slice';

const store = createStore(serviceReducer);
configure({ adapter: new Adapter() });

const ReduxProvider = ({ children, reduxStore }) => <Provider store={reduxStore}>{children}</Provider>;

describe('Screen/ServiceListingScreen', () => {
    it('renders correctly ', () => {
        const wrapper = shallow(
            <Provider store={store}>
                <ServiceListingScreen />
            </Provider>,
        );
        // const tree = renderer(wrapper).toJSON();
        // expect(tree).toMatchSnapshot();
    });
});
