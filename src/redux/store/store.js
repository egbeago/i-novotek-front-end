import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../slices/category/categorySlice'
import post from '../slices/posts/postSlices'
import usersReducer from '../slices/users/usersSlices'

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoriesReducer,
    post,
  },
})

export default store
