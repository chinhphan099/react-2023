// import { PayloadAction, createAction, createReducer, createSlice, current, nanoid } from '@reduxjs/toolkit'
import { PayloadAction, createSlice, current, nanoid } from '@reduxjs/toolkit'
import { initialPostList } from 'constant/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}
const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null
}

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
    }
  },
  extraReducers(builder) {
    builder
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
export const { addPost, deletePost, startEditingPost, finishEditingPost, cancelEditingPost } = blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer
