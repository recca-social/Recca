import { all } from 'redux-saga/effects'
import media from './mediaSaga'

export default function* rootSaga() {
  yield all([media()])
}
