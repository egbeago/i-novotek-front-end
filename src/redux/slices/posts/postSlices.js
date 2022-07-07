import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../../utils/baseURL'

// action to redirect
const resetPost = createAction('createpost/reset')
const resetPostEdit = createAction('post/reset')

// Create Posst action
export const createpostAction = createAsyncThunk(
  'post/created',
  async (post, { rejectWithValue, getState, dispatch }) => {
    // get user tiken
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      // http call
      const formData = new FormData()
      formData.append('title', post?.title)
      formData.append('description', post?.description)
      formData.append('category', post?.category)
      formData.append('image', post?.image)

      const { data } = await axios.post(
        `${baseUrl}/api/posts`,
        formData,
        config
      )
      // dispatch action
      dispatch(resetPost())
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)
// update Posst action
export const updatePostAction = createAsyncThunk(
  'post/update',
  async (post, { rejectWithValue, getState, dispatch }) => {
    // get user tiken
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      // http call

      const { data } = await axios.put(
        `${baseUrl}/api/posts/${post?.id}`,
        post,
        config
      )
      // dispatch action
      dispatch(resetPostEdit())
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

// fetch all post
export const fetchPostsAction = createAsyncThunk(
  'post/list',
  async (category, { rejectWithValue, getState, dispatch }) => {
    // fetch all posts
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/posts?category=${category}`
      )
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)
// fetch Post Details
export const fetchPostsDetailsAction = createAsyncThunk(
  'post/details',
  async (id, { rejectWithValue, getState, dispatch }) => {
    // fetch all posts
    try {
      const { data } = await axios.get(`${baseUrl}/api/posts/${id}`)
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

// Add Likes to post
export const toggleAddLikesToPost = createAsyncThunk(
  'post/like',
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // get user tiken
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/posts/likes`,
        { postId },
        config
      )
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

// Add disLikes to post
export const toggleAddDislikesToPost = createAsyncThunk(
  'post/dislike',
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // get user tiken
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/posts/dislikes`,
        { postId },
        config
      )
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

// slice
const postSlice = createSlice({
  name: 'post',
  initialState: {},
  extraReducers: (builder) => {
    // Create post
    builder.addCase(createpostAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetPost, (state, action) => {
      state.isCreated = true
    })
    builder.addCase(createpostAction.fulfilled, (state, action) => {
      state.postCreated = action?.payload
      state.loading = false
      state.isCreated = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(createpostAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.payload?.message
    })
    // updat post
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetPostEdit, (state, action) => {
      state.isUpdated = true
    })
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload
      state.loading = false
      state.isCreated = false
      state.appErr = undefined
      state.serverErr = undefined
      state.isUpdated = false
    })
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.payload?.message
    })
    // fetch posts
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.postLists = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.payload?.message
    })
    // fetch posts Details
    builder.addCase(fetchPostsDetailsAction.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(fetchPostsDetailsAction.fulfilled, (state, action) => {
      state.postDetails = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchPostsDetailsAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.payload?.message
    })
    // Like a post
    builder.addCase(toggleAddLikesToPost.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(toggleAddLikesToPost.fulfilled, (state, action) => {
      state.likes = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(toggleAddLikesToPost.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.payload?.message
    })
    // disLike a post
    builder.addCase(toggleAddDislikesToPost.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(toggleAddDislikesToPost.fulfilled, (state, action) => {
      state.dislikes = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(toggleAddDislikesToPost.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.payload?.message
    })
  },
})

export default postSlice.reducer
