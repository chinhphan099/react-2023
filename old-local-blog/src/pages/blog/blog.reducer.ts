import { createAction, createReducer } from '@reduxjs/toolkit'
import { initalPostList } from 'constant/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
}
const initalState: BlogState = {
  postList: initalPostList
}

export const addPost = createAction<Post>('blog/addPost')

const blogReducer = createReducer(initalState, (builder) => {
  builder.addCase(addPost, (state, action) => {
    const post = action.payload
    state.postList.push(post)
  })
})

export default blogReducer
