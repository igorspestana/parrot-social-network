import { useState, useEffect } from "react"
import api from "../../services/api"
import { UserCircle, Chat, Heart } from "phosphor-react"
import Heading from "../Heading"
import Text from "../Text"

interface Post {
    _id: string;
    title: string;
    description: string;
    profile: {
        name: string;
    };
    comments: [];
    likes: [];
}

function Feed() {
    const token = localStorage.getItem("accessToken")
    const user = localStorage.getItem("user")
    const profile = localStorage.getItem("profile")
    const [posts, setPosts] = useState<Post[]>([])
    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        async function getPosts() {
            const response = await api.get('/feed', authHeader)
            setPosts(response.data)
        }
        getPosts()
    }, [])

    async function handleLike(postId: String) {
        try {
            await api.post(`/posts/${postId}/like`, null, authHeader)
            const newPost = posts.filter(post => post._id === postId).map(post => {
                post.likes.push(profile)
                return post
            })

            setPosts((posts) => {
                const post = newPost[0]
                const index = posts.indexOf(post)
                posts[index] = post
                return [...posts]
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <Heading className="border-b border-slate-400 mt-4">
                <Text size='lg' className="font-extrabold ml-5">Página Inicial</Text>
                <div className="flex flex-row items-center ml-5 my-4">
                    <UserCircle size={48} weight='light' className="text-slate-50" />
                    <Text className="font-extrabold ml-2">{user}</Text>
                </div>
            </Heading>
            <section>
                {posts && posts.map((post: Post) => (
                    <div className="border-b border-slate-400" key={post._id}>
                        <div className="flex flex-row items-center ml-5 my-4">
                            <UserCircle size={48} weight='light' className="text-slate-50" />
                            <Text className="font-extrabold ml-2">{post.profile.name}</Text>
                        </div>
                        <div className="ml-16 flex flex-col gap-2">
                            <Heading size="sm">{post.title}</Heading>
                            <Text asChild>
                                <p>{post.description}</p>
                            </Text>
                        </div>
                        <div className="flex items-center ml-16 my-4 space-x-2">
                            <Chat size={24} className="text-slate-50" />
                            <Text size="sm">{post.comments.length}</Text>

                            <div className="hover:bg-sky-400 rounded-full p-1" onClick={() => handleLike(post._id)}>
                                <Heart size={24} className="text-slate-50" />
                            </div>
                            <Text size="sm">{post.likes.length}</Text>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default Feed