import {useRecoilValue} from "recoil";
import {errorAtom} from "atoms/api";
import Typography from "@mui/material/Typography";

export const Error = () => {
    const error = useRecoilValue(errorAtom);

    if (!error) return null

    return (
        <Typography align="center" sx={{ display: 'flex', justifyContent: 'center', p: 2 }} variant="h4" component="div" color="error.main">
            {error}
        </Typography>
    );
}