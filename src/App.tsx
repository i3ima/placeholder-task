import {Posts} from "components/Posts";
import Box from "@mui/material/Box";

const App = () => {
    return (
            <Box sx={{
                bgcolor: 'background.default',
                color: 'text.primary'
            }}>
                <Posts/>
            </Box>
    )
};

export default App;
