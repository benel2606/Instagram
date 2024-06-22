import { createStore, combineReducers } from 'redux'

import { storyReducer } from './story.reducer'
import { boardReducer } from './board.reducer'
import { userReducer } from './user.reducer'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    storyModule: storyReducer,
    boardModule: boardReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)




