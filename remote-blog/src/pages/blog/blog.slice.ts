import { PayloadAction, AsyncThunk, createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { Post } from 'types/blog.type'
import http from 'utils/http'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface BlogState {
  postList: Post[]
  editingPost: Post | null
  toggleCreatePostForm: boolean
  loading: boolean
  currentRequestId: undefined | string
}
const initialState: BlogState = {
  postList: [],
  editingPost: null,
  toggleCreatePostForm: false,
  loading: false,
  currentRequestId: undefined
}
export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
  const response = await http.get<Post[]>('posts', {
    signal: thunkAPI.signal
  })
  return response.data
})
export const addPost = createAsyncThunk('blog/addPost', async (body: Omit<Post, 'id'>, thunkAPI) => {
  const response = await http.post<Post>('posts', body, {
    signal: thunkAPI.signal
  })
  return response.data
})
export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ postId, body }: { postId: string; body: Post }, thunkAPI) => {
    const response = await http.put<Post>(`posts/${postId}`, body, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)
export const deletePost = createAsyncThunk('blog/deletePost', async (postId: string, thunkAPI) => {
  const response = await http.delete<Post>(`posts/${postId}`, {
    signal: thunkAPI.signal
  })
  return response.data
})

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditingPost: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const foundPost = state.postList.find((post) => post.id === id) || null
      state.editingPost = foundPost
      state.toggleCreatePostForm = true
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
      state.toggleCreatePostForm = !state.toggleCreatePostForm
    },
    toggleCreatePostForm: (state) => {
      state.toggleCreatePostForm = !state.toggleCreatePostForm
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postList.find((post, index) => {
          if (post.id === action.payload.id) {
            state.postList[index] = action.payload
            return true
          }
          return false
        })
        state.editingPost = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.meta.arg
        const foundPostIndex = state.postList.findIndex((post) => post.id === id)
        const foundPost = state.postList.find((post) => post.id === id) || null
        if (foundPostIndex !== -1 && foundPost) {
          state.postList.splice(foundPostIndex, 1)
          if (state.editingPost && state.editingPost.id === foundPost.id) {
            state.editingPost = null
          }
        }
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addDefaultCase((state, action) => {
        console.log('defaultCase', action.type)
      })
  }
})

export const { startEditingPost, cancelEditingPost, toggleCreatePostForm } = blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer
