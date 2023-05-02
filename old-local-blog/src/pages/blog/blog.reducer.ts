import { createReducer } from '@reduxjs/toolkit'
import { initalPostList } from 'constant/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
}
const initalState: BlogState = {
  postList: initalPostList
}
const blogReducer = createReducer(initalState, (builder) => {
  //
})

export default blogReducer
