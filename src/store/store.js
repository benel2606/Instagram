import { createStore, combineReducers } from 'redux'
import { storyReducer } from './story.reducer'
import { userReducer } from './user.reducer'

const rootReducer = combineReducers({
    storyModule: storyReducer,
    userModule: userReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)




