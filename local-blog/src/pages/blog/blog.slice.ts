import { createAction, createReducer } from '@reduxjs/toolkit'
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

export const addPost = createAction<Post>('blog/addPost')
export const deletePost = createAction<string>('blog/deletePost')
export const startEditingPost = createAction<string>('blog/startEditingPost')
export const finishEditingPost = createAction<Post>('blog/finishEditingPost')
export const cancelEditingPost = createAction('blog/cancelEditingPost')

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      const post = action.payload
      state.postList.push(post)
    })
    .addCase(deletePost, (state, action) => {
      const id = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === id)
      const foundPost = state.postList.find((post) => post.id === id) || null
      if (foundPostIndex !== -1 && foundPost) {
        state.postList.splice(foundPostIndex, 1)
        if (state.editingPost && state.editingPost.id === foundPost.id) {
          state.editingPost = null
        }
      }
    })
    .addCase(startEditingPost, (state, action) => {
      const id = action.payload
      const foundPost = state.postList.find((post) => post.id === id) || null
      state.editingPost = foundPost
    })
    .addCase(finishEditingPost, (state, action) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    })
    .addCase(cancelEditingPost, (state) => {
      state.editingPost = null
    })
})

export default blogReducer
