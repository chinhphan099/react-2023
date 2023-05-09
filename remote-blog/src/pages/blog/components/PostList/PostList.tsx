import { useSelector } from 'react-redux'
import PostItem from '../PostItem'
import { RootState, useAppDispatch } from 'store'
import { deletePost, getPostList, startEditingPost, toggleCreatePostForm } from 'pages/blog/blog.slice'
import styles from './PostList.module.css'
import { useEffect } from 'react'
import SkeletonPost from '../SkeletonPost'

export default function PostList() {
  const postList = useSelector((state: RootState) => state.blog.postList)
  const loading = useSelector((state: RootState) => state.blog.loading)
  const dispath = useAppDispatch()

  useEffect(() => {
    const promise = dispath(getPostList())
    return () => {
      promise.abort()
    }
  }, [dispath])

  const handleDetele = (postId: string) => {
    dispath(deletePost(postId))
  }
  const handleStartEditing = (postId: string) => {
    dispath(startEditingPost(postId))
  }
  const handleToggleCreatePostForm = () => {
    dispath(toggleCreatePostForm())
  }

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>My Blog</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {loading && (
            <>
              <SkeletonPost />
              <SkeletonPost />
            </>
          )}
          {!loading &&
            postList.map((postItem) => (
              <PostItem
                post={postItem}
                key={postItem.id}
                handleDetele={handleDetele}
                handleStartEditing={handleStartEditing}
              />
            ))}
        </div>
      </div>
      <div className={styles.ButtonWrap}>
        <button
          className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
          type='button'
          onClick={handleToggleCreatePostForm}
        >
          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            Show/Hide Create Post Form
          </span>
        </button>
      </div>
    </div>
  )
}
