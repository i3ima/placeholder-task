import {atom} from "recoil";
import {Post} from "types/posts";

export const postsAtom = atom<Post[]>({
    key: 'posts',
    default: []
});

export const postAtom = atom<Post | null>({
    key: 'post',
    default: null
})