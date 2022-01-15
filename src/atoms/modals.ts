import {atom} from "recoil";

export const editAtom = atom({
    key: 'edit',
    default: false
})

export const addAtom = atom({
    key: 'add',
    default: false
})
