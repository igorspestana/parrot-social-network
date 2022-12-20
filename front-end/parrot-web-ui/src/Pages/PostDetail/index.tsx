import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Menu from "../../components/Menu"
import PostItem from "../../components/PostItem"
import api from "../../services/api"
import { getAuthHeader } from "../../services/auth"
import { likePost, unlikePost } from "../../services/posts"
import Text from '../../components/Text'
import { Post } from "../../Model/Post"

function PostDetail() {
    const { postId } = useParams()
    const [postDetail, setPostDetail] = useState<Post>()
    const profile = localStorage.getItem("profile") as string

    useEffect(() => {
        async function fetchPostDetail() {
            try {
                const response = await api.get(`/posts/${postId}`, getAuthHeader())
                setPostDetail(response.data)
                console.log(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchPostDetail()
    }, [])

    async function handleLike(postId: string) {
        try {
            if (postDetail?.likes.includes(profile)) {
                const newPost = await unlikePost(postDetail, profile)
                newPost && setPostDetail({ ...newPost })
            } else {
                const newPost = postDetail && (await likePost(postDetail, profile))
                newPost && setPostDetail({ ...newPost })
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="w-screen h-screen flex">
            <Menu />
            <div className="flex flex-col w-full">
                {postDetail && <PostItem post={postDetail} handleLike={handleLike} />}
                <Text size="lg">Comentários:</Text>
                <ul>
                    <li className="text-white">Teste</li>
                    {postDetail && postDetail.comments.map((comment) =>
                        <li>Teste</li>
                    )}
                </ul>

            </div>
        </div>
    )
}

export default PostDetail