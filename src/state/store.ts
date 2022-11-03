import { configureStore } from '@reduxjs/toolkit'
import peopleReducer from './person/reducer'
import ruleReducer from './rule/reducer'

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    rule: ruleReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch