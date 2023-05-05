// import { PayloadAction, createAction, createReducer, createSlice, current, nanoid } from '@reduxjs/toolkit'
import { PayloadAction, createAsyncThunk, createSlice, current, nanoid } from '@reduxjs/toolkit'
import { initialPostList } from 'constant/blog'
import { Post } from 'types/blog.type'
import http from 'utils/http'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
  toggleCreatePostForm: boolean
}
const initialState: BlogState = {
  postList: [],
  editingPost: null,
  toggleCreatePostForm: false
}
export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
  const response = await http.get<Post[]>('posts', {
    signal: thunkAPI.signal
  })
  return response.data
})

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        const post = action.payload
        state.postList.push(post)
      },
      prepare: (post: Omit<Post, 'id'>) => ({
        payload: {
          ...post,
          id: nanoid()
        }
      })
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === id)
      const foundPost = state.postList.find((post) => post.id === id) || null
      if (foundPostIndex !== -1 && foundPost) {
        state.postList.splice(foundPostIndex, 1)
        if (state.editingPost && state.editingPost.id === foundPost.id) {
          state.editingPost = null
        }
      }
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const foundPost = state.postList.find((post) => post.id === id) || null
      state.editingPost = foundPost
    },
    finishEditingPost: (state, action: PayloadAction<Post>) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
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
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state, action) => {
          console.log(current(state))
        }
      )
      .addDefaultCase((state, action) => {
        console.log('defaultCase', action.type)
      })
  }
})

export const { addPost, deletePost, startEditingPost, finishEditingPost, cancelEditingPost, toggleCreatePostForm } =
  blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer
