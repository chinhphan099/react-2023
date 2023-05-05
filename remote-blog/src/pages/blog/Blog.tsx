import { useSelector } from 'react-redux'
import CreatePost from './components/CreatePost'
import PostList from './components/PostList'
import { RootState } from 'store'

export default function Blog() {
  const toggleCreatePostForm = useSelector((state: RootState) => state.blog.toggleCreatePostForm)
  return (
    <div className='p-5'>
      {toggleCreatePostForm && <CreatePost />}
      <PostList />
    </div>
  )
}
