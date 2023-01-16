import { combineReducers, createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import { favoriteListReducer } from "../reducers/favoriteListReducer"

const rootReducer = combineReducers({
  favorite: favoriteListReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))

export default store