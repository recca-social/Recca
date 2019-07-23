import { createStore } from 'redux';
import reducers from './reducers';

export function configureStore() {
    return createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
};