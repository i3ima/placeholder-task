import {useRecoilState, useSetRecoilState} from "recoil";
import {addAtom} from "atoms/modals";
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {Post} from "types/posts";
import {FormControl, FormHelperText} from "@mui/material";
import {addPost} from "api/posts";
import {postsAtom} from "atoms/postsAtom";
import {errorAtom} from "atoms/api";

export const AddPostDialog = () => {
    const setErrorState = useSetRecoilState(errorAtom);

    const setPosts = useSetRecoilState(postsAtom);
    const [error, setError] = useState("");

    const [post, setPost] = useState<Omit<Post, 'id' | 'userId'>>({
        title: '',
        body: '',
    });
    const [isAddOpen, setAdd] = useRecoilState(addAtom);

    const isError = error.length > 0;

    const handleClose = () => {
        setAdd(false);
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
            addPost(post)
                .then((resp) => {
                    setPosts((oldList) => [
                        resp,
                        ...oldList,
                    ]);
                    handleClose();
                }).catch(e => {
                setErrorState(e.message);
            })
        }
    }

    return (
        <Dialog fullWidth open={isAddOpen} onClose={handleClose}>
            <DialogTitle>Add new post</DialogTitle>
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
                                    error={isError}
                                    multiline
                                    name="body"
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
                            Post
                        </Button>
                    </FormControl>
                </form>
            </DialogContent>
        </Dialog>
    )
}