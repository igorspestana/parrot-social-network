import { Post } from '../../Model/Post'
import PostItem from "../PostItem"

interface FeedProps {
    posts: Post[];
    handleLike: (postId: string) => void
}

function Feed({ posts, handleLike }: FeedProps) {

    return (
        <div className="basis-5/6 overflow-y-auto scroll-smooth" >
            <section>
                {posts && posts.map((post: Post) => (
                    <PostItem post={post} handleLike={handleLike} key={post._id} />
                ))}
            </section>
        </div >
    )
}

export default Feed