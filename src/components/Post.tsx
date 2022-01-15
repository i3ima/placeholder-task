import React from "react";
import {Post as Posts} from "types/posts";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {useSetRecoilState} from "recoil";
import {editAtom} from "atoms/modals";
import {postAtom} from "atoms/postsAtom";

type Properties = Posts;

export const Post: React.FC<Properties> = (post) => {
    const setEdit = useSetRecoilState(editAtom);
    const setPost = useSetRecoilState(postAtom);

    const onEditHandler = () => {
        setEdit(true);
        setPost({
            ...post,
            id: post.id,
        });
    }

    return (
        <Card sx={{borderRadius: 4, boxShadow: 3}}>
            <CardContent>
                <Typography variant="h5" component="div">{post.title}</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    User: {post.userId}
                </Typography>
                <Typography variant="body1">{post.body}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={onEditHandler} size="medium">Edit</Button>
            </CardActions>
        </Card>
    )
}