import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../../utils/baseURL'

// action to redirect
const resetEditAction = createAction('category/reset')
const resetDeleteAction = createAction('category/delete-reset')
const resetCategoryAction = createAction('category/resetCategory-reset')

// action
export const createCategoryAction = createAsyncThunk(
  'category/create',
  async (category, { rejectWithValue, getState, dispatch }) => {
    // get user tiken
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    // http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/category`,
        {
          title: category?.title,
        },
        config
      )
      dispatch(resetCategoryAction())
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

// action
export const fetchCategoriesAction = createAsyncThunk(
  'category/fetch',
  async (category, { rejectWithValue, getState, dispatch }) => {
    // get user tiken
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    // http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/category`, config)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
// update action
export const updateCategoriesAction = createAsyncThunk(
  'category/update',
  async (category, { rejectWithValue, getState, dispatch }) => {
    // get user tiken
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    // http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/category/${category?.id}`,
        { title: category?.title },
        config
      )
      // dispatch action to reset the updated data
      dispatch(resetEditAction())
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
// delete action
export const deleteCategoriesAction = createAsyncThunk(
  'category/delete',
  async (id, { rejectWithValue, getState, dispatch }) => {
    // get user tiken
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    // http call
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/category/${id}`,
        config
      )
      // dispatch action
      dispatch(resetDeleteAction())
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
// fetcn single details  action
export const fetchCategoryAction = createAsyncThunk(
  'category/details',
  async (id, { rejectWithValue, getState, dispatch }) => {
    // get user tiken
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    // http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/category/${id}`, config)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

// slices
const categorySlices = createSlice({
  name: 'category',
  initialState: {},
  extraReducers: (builder) => {
    // create category
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetCategoryAction, (state, action) => {
      state.isCreated = true
    })
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload
      state.isCreated = false
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.payload?.message
    })

    // fetch all

    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categoryList = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.payload?.message
    })

    // update
    builder.addCase(updateCategoriesAction.pending, (state, action) => {
      state.loading = true
    })
    // Dispatch action
    builder.addCase(resetEditAction, (state, action) => {
      state.isEdited = true
    })
    builder.addCase(updateCategoriesAction.fulfilled, (state, action) => {
      state.updateCategory = action?.payload
      state.isEdited = false
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(updateCategoriesAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.payload?.message
    })
    // delete
    builder.addCase(deleteCategoriesAction.pending, (state, action) => {
      state.loading = true
    })
    // dispatch delete for redirect
    builder.addCase(resetDeleteAction, (state, action) => {
      state.isDeleted = true
    })
    builder.addCase(deleteCategoriesAction.fulfilled, (state, action) => {
      state.deletedCategory = action?.payload
      state.isDeleted = false
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(deleteCategoriesAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.payload?.message
    })
    // fetch single details  action
    builder.addCase(fetchCategoryAction.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.payload?.message
    })
  },
})

export default categorySlices.reducer
