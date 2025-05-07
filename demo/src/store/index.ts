import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer
})

export type AppState = ReturnType<typeof rootReducer>;

if (process.env.NODE_ENV === 'development' && import.meta.hot) {
  import.meta.hot?.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export default store