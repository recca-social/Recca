import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

export function configureStore() {
  const middleware = [sagaMiddleware]
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware))
  )
}

export function runSagas() {
  sagaMiddleware.run(sagas)
}
