import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {editAtom} from "atoms/modals";
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {Post} from "types/posts";
import {FormControl, FormHelperText} from "@mui/material";
import {editPost} from "api/posts";
import {postAtom, postsAtom} from "atoms/postsAtom";
import {errorAtom} from "atoms/api";


export const EditPostDialog = () => {
    const setErrorState = useSetRecoilState(errorAtom);

    const setPosts = useSetRecoilState(postsAtom);
    const currentPost = useRecoilValue(postAtom);
    const [error, setError] = useState("");

    const [post, setPost] = useState<Post>({ id: 0, title: '', body: '', userId: 0 });
    const [isEditOpen, setEdit] = useRecoilState(editAtom);

    const isError = error.length > 0;

    const handleClose = () => {
        setEdit(false);
        setError("");
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const {body, title} = post;
        if (title === '' || body === '') {
            setError("Fields cannot be empty")
            return
        } else {
            setError("")
            editPost(post)
                .then((resp) => {
                    setPosts((oldList) => [
                        resp,
                        ...oldList,
                    ]);
                    handleClose();
                }).catch(e => setErrorState(e.message))
        }
    }

    useEffect(() => {
        setPost(currentPost!);
    }, [currentPost])

    if (!post || !isEditOpen) return null

    return (
        <Dialog fullWidth open={isEditOpen} onClose={handleClose}>
            <DialogTitle>Edit post</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter title and body of post
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                    <FormControl
                        fullWidth
                        component="fieldset"
                        error={isError}
                        variant="standard"
                    >
                        <Grid sx={{pt: 2}} container direction="column" spacing={2}>
                            <Grid item>
                                <TextField
                                    value={post.title}
                                    error={isError}
                                    autoFocus
                                    name="title"
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    value={post.body}
                                    error={isError}
                                    name="body"
                                    multiline
                                    label="Body"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <FormHelperText>{error}</FormHelperText>
                        <Button sx={{mt: 2}} type="submit" variant="outlined">
                            Update post
                        </Button>
                    </FormControl>
                </form>
            </DialogContent>
        </Dialog>
    )
}
