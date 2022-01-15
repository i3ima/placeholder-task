import {usePosts} from "api/posts";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import {Post} from "./Post";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useRecoilState, useSetRecoilState} from "recoil";
import {addAtom} from "atoms/modals";
import {AddPostDialog} from "./AddPostDialog";
import {postsAtom} from "atoms/postsAtom";
import {useEffect} from "react";
import {EditPostDialog} from "components/EditPostDialog";
import {Error} from "components/Error";
import {errorAtom} from "atoms/api";

export const Posts = () => {
    const setError = useSetRecoilState(errorAtom);
    const setAdd = useSetRecoilState(addAtom);
    const [postsList, setPosts] = useRecoilState(postsAtom);

    const {data: postsData, isLoading, error} = usePosts()

    const onAdd = () => {
        setAdd(true)
    }

    useEffect(() => {
        if (error) setError(error.message);
    }, [error])

    useEffect(() => {
        setPosts(postsData!);
    }, [postsData, isLoading])

    return (
        <Box minHeight="100vh">
            <Box sx={{display: 'flex', justifyContent: 'space-between', p: 2}}>
                <Typography variant="h4" component="div">
                    Posts
                </Typography>
                <Button onClick={onAdd} size="large">
                    Add Post
                </Button>
            </Box>
            <Error />
            <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} maxWidth="md">
                {isLoading ? <CircularProgress/> :
                    <Grid container direction="column" spacing={2}>
                        {postsList?.map((post, idx) =>
                            <Grid key={idx + 1} item>
                                <Post {...post}/>
                            </Grid>)}
                    </Grid>
                }
                <AddPostDialog/>
                <EditPostDialog/>
            </Container>
        </Box>
    );
}