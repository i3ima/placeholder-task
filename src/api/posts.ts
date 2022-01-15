import swrFetcher from "../utils/swrFetcher";
import useSWR from 'swr'
import {Post} from "types/posts";
import {fetchApi} from "utils/fetch";

export const usePosts = () => {
    const { data, error, mutate} = useSWR<Post[]>('/posts', (key) => swrFetcher(key, {}))

    return { data, isLoading: !error && !data, mutate, error };
}

export const editPost = (post: Post): Promise<Post> => {
    return fetchApi({
        path: `/posts/${post.id}`,
        body: post,
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
}

export const addPost = (post: Omit<Post, 'userId' | 'id'>): Promise<Post> => {
    return fetchApi({
        path: "/posts",
        method: "POST",
        body: {
            ...post,
            userId: 1
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
}